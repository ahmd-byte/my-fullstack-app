# Automation Hub

A modern, full-stack automation management platform with a beautiful minimalist UI inspired by Apple and Linear.app design principles.

## 🌟 Features

- **Modern UI**: Clean, minimalist interface with dark mode support
- **Automation Management**: Run and monitor Python automation scripts
- **Real-time Execution**: Execute automations and view results instantly
- **Execution History**: Track all automation runs with detailed logs
- **Analytics Dashboard**: Visualize automation performance and statistics
- **Authentication**: Secure JWT-based authentication system
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **JSON File Database** - Simple data persistence

### Automation Scripts
- **Python 3.12+** - Automation scripting language

## 📋 Prerequisites

- Node.js 16+ and npm
- Python 3.12+
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/automation-hub.git
cd automation-hub
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
PYTHON_PATH=python
AUTOMATION_SCRIPTS_PATH=../python/automations
```

Create the data directory:

```bash
mkdir data
```

Create `backend/data/automations.json`:

```json
[
  {
    "id": "1",
    "name": "Data Sync Daily",
    "description": "Synchronizes customer data between CRM and Database.",
    "script": "automation1.py",
    "schedule": "Daily 8:00 AM"
  },
  {
    "id": "2",
    "name": "Report Generator",
    "description": "Generates weekly PDF reports and emails them to stakeholders.",
    "script": "automation2.py",
    "schedule": "Weekly Mon 9:00 AM"
  },
  {
    "id": "3",
    "name": "Email Blast",
    "description": "Sends marketing emails to subscribed users.",
    "script": "automation3.py",
    "schedule": "Manual"
  },
  {
    "id": "4",
    "name": "System Check",
    "description": "Checks server health and disk space.",
    "script": "automation4.py",
    "schedule": "Hourly"
  }
]
```

Create `backend/data/history.json`:

```json
[]
```

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Create Your First User

Register a user using PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -ContentType "application/json" -Body '{"username":"admin","password":"admin123"}'
```

Or using curl (Git Bash/Linux/Mac):

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 5. Login and Use

1. Navigate to `http://localhost:5173/login`
2. Login with your credentials (admin/admin123)
3. Explore the dashboard, automations, and analytics!

## 📁 Project Structure

```
automation-hub/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── api/             # API client configuration
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page components
│   │   └── App.jsx          # Main app component
│   └── package.json
│
├── backend/                  # Express backend server
│   ├── data/                # JSON database files (gitignored)
│   ├── middleware/          # Express middleware
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── server.js            # Server entry point
│   └── package.json
│
└── python/                   # Python automation scripts
    └── automations/
        ├── automation1.py   # System health check
        ├── automation2.py   # Log file analysis
        ├── automation3.py   # Database backup
        └── automation4.py   # Activity report
```

## 🎨 Design Philosophy

The UI follows a minimalist design approach inspired by:
- **Apple**: Clean spacing, no clutter, calm visuals
- **Linear.app**: Modern SaaS aesthetics, subtle animations

### Design Principles
- Rounded corners (16-24px)
- Subtle gradients and shadows
- Extensive whitespace
- Smooth micro-interactions (150-200ms)
- High readability with Inter font family

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in
2. Backend generates a JWT token
3. Token is stored in localStorage
4. Token is sent with every API request via Authorization header
5. Backend validates token for protected routes

**Note**: Users are stored in-memory and will be lost on server restart. For production, use a proper database.

## 🐍 Creating Custom Automations

Add new Python scripts to `python/automations/`:

```python
import json
import sys

def your_automation_logic():
    # Your automation code here
    result = {
        "status": "success",
        "data": "Your data here"
    }
    return result

if __name__ == "__main__":
    try:
        result = your_automation_logic()
        print(json.dumps(result))  # Output to stdout
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)
```

Then add it to `backend/data/automations.json`:

```json
{
  "id": "5",
  "name": "Your Automation",
  "description": "Description of what it does",
  "script": "your_script.py",
  "schedule": "Manual"
}
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Automations
- `GET /api/automation` - List all automations
- `GET /api/automation/:id` - Get automation details
- `POST /api/automation/run/:id` - Execute automation
- `GET /api/automation/history` - Get execution history
- `GET /api/automation/stats` - Get dashboard statistics

## 🚧 Known Limitations

1. **In-Memory User Storage**: Users are lost on server restart
2. **No Scheduling**: Automations must be run manually
3. **No Real-time Updates**: UI requires refresh to see updates
4. **Single User Session**: No multi-user support

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Cron-based automation scheduling
- [ ] WebSocket for real-time updates
- [ ] Multi-user support with roles
- [ ] Email notifications for failures
- [ ] Automation templates library
- [ ] API rate limiting
- [ ] Comprehensive test coverage

## 📝 License

MIT License - feel free to use this project for your portfolio or learning!

## 👤 Author

Your Name - [Your GitHub](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Design inspiration from Apple and Linear.app
- Icons by Lucide
- Charts by Recharts
