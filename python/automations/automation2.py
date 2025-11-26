import json
import datetime
import sys
import random

def run_log_file_analysis():
    """
    Simulates log file analysis.
    Returns a summary of "errors" and "warnings".
    """
    log_entries = [
        {"level": "INFO", "message": "User 'admin' logged in from 192.168.1.100"},
        {"level": "WARNING", "message": "High CPU usage detected on process ID 1234"},
        {"level": "ERROR", "message": "Database connection failed: Timeout"},
        {"level": "INFO", "message": "API endpoint /data accessed successfully"},
        {"level": "WARNING", "message": "Disk space low on /var partition"},
        {"level": "ERROR", "message": "Unhandled exception in module 'processor.py'"},
        {"level": "INFO", "message": "Scheduled backup completed"},
    ]

    errors = [entry for entry in log_entries if entry["level"] == "ERROR"]
    warnings = [entry for entry in log_entries if entry["level"] == "WARNING"]

    summary = {
        "total_entries_simulated": len(log_entries),
        "errors_found": len(errors),
        "warnings_found": len(warnings),
        "recent_errors": errors,
        "recent_warnings": warnings,
        "analysis_time": datetime.datetime.now().isoformat(),
        "random_metric": random.randint(100, 1000) # Just for variety
    }
    return summary

if __name__ == "__main__":
    try:
        result = run_log_file_analysis()
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e), "status": "failed"}), file=sys.stderr)
        sys.exit(1)