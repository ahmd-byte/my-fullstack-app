const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const auth = require('../middleware/auth');
const { AUTOMATIONS_FILE, HISTORY_FILE, readData, writeData } = require('../utils/db');
const router = express.Router();

const PYTHON_PATH = process.env.PYTHON_PATH || 'python'; // Default to 'python'
const AUTOMATION_SCRIPTS_PATH = path.join(__dirname, '..', process.env.AUTOMATION_SCRIPTS_PATH || '../python/automations');

// @route   GET /api/automation
// @desc    Get all automations with latest status
// @access  Private
router.get('/', auth, (req, res) => {
  const automations = readData(AUTOMATIONS_FILE);
  const history = readData(HISTORY_FILE);

  const automationsWithStatus = automations.map(auto => {
    const autoHistory = history.filter(h => h.automationId === auto.id);
    const lastRun = autoHistory.length > 0 ? autoHistory[autoHistory.length - 1] : null;
    return {
      ...auto,
      status: lastRun ? (lastRun.success ? 'Success' : 'Error') : 'Idle',
      lastRun: lastRun ? lastRun.timestamp : null
    };
  });

  res.json(automationsWithStatus);
});

// @route   GET /api/automation/history
// @desc    Get global execution history
// @access  Private
router.get('/history', auth, (req, res) => {
  const history = readData(HISTORY_FILE);
  const automations = readData(AUTOMATIONS_FILE);

  // Enrich history with automation names
  const enrichedHistory = history.map(h => {
    const auto = automations.find(a => a.id === h.automationId);
    return {
      ...h,
      automationName: auto ? auto.name : 'Unknown'
    };
  }).reverse(); // Newest first

  res.json(enrichedHistory);
});

// @route   GET /api/automation/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', auth, (req, res) => {
  const automations = readData(AUTOMATIONS_FILE);
  const history = readData(HISTORY_FILE);

  const totalRuns = history.length;
  const successRuns = history.filter(h => h.success).length;
  const successRate = totalRuns > 0 ? ((successRuns / totalRuns) * 100).toFixed(1) : 0;

  // Calculate average duration (mock calculation as duration string parsing is complex)
  // In a real app, store duration in ms

  res.json({
    totalAutomations: automations.length,
    totalRuns,
    successRate: `${successRate}%`,
    avgDuration: '45s' // Mock for now
  });
});

// @route   GET /api/automation/:id
// @desc    Get single automation details
// @access  Private
router.get('/:id', auth, (req, res) => {
  const automations = readData(AUTOMATIONS_FILE);
  const automation = automations.find(a => a.id === req.params.id);

  if (!automation) {
    return res.status(404).json({ message: 'Automation not found' });
  }

  const history = readData(HISTORY_FILE);
  const autoHistory = history.filter(h => h.automationId === automation.id).reverse();

  const totalRuns = autoHistory.length;
  const successRuns = autoHistory.filter(h => h.success).length;
  const successRate = totalRuns > 0 ? ((successRuns / totalRuns) * 100).toFixed(1) : 0;

  res.json({
    ...automation,
    history: autoHistory,
    stats: {
      totalRuns,
      successRate: `${successRate}%`,
      avgDuration: '45s'
    }
  });
});

// @route   POST /api/automation/run/:id
// @desc    Execute a specific Python automation script
// @access  Private
router.post('/run/:id', auth, (req, res) => {
  const automationId = req.params.id;
  const automations = readData(AUTOMATIONS_FILE);
  const automation = automations.find(a => a.id === automationId);

  if (!automation) {
    return res.status(404).json({ message: 'Automation not found' });
  }

  const scriptName = automation.script;
  const scriptPath = path.join(AUTOMATION_SCRIPTS_PATH, scriptName);

  console.log(`Attempting to execute: ${PYTHON_PATH} ${scriptPath}`);

  const startTime = Date.now();
  const pythonProcess = spawn(PYTHON_PATH, [scriptPath]);

  let scriptOutput = '';
  let scriptError = '';

  pythonProcess.stdout.on('data', (data) => {
    scriptOutput += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    scriptError += data.toString();
  });

  pythonProcess.on('close', (code) => {
    const endTime = Date.now();
    const durationMs = endTime - startTime;
    const duration = `${(durationMs / 1000).toFixed(1)}s`;

    const isSuccess = code === 0;
    let resultData = null;

    if (isSuccess) {
      try {
        resultData = JSON.parse(scriptOutput);
      } catch (e) {
        console.warn('Script output not JSON');
      }
    }

    // Save to history
    const history = readData(HISTORY_FILE);
    const newRecord = {
      id: Date.now().toString(),
      automationId,
      timestamp: new Date().toISOString(),
      success: isSuccess,
      duration,
      output: scriptOutput,
      error: scriptError,
      executedBy: req.user.username
    };

    history.push(newRecord);
    writeData(HISTORY_FILE, history);

    if (isSuccess) {
      res.json({
        message: `Automation ${automation.name} executed successfully`,
        result: resultData,
        record: newRecord
      });
    } else {
      res.status(500).json({
        message: `Automation ${automation.name} failed`,
        error: scriptError,
        record: newRecord
      });
    }
  });

  pythonProcess.on('error', (err) => {
    console.error(`Failed to start Python process:`, err);
    res.status(500).json({
      message: `Failed to start automation process.`,
      error: err.message
    });
  });
});

module.exports = router;