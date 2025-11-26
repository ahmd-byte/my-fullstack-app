import json
import datetime
import sys

def run_system_health_check():
    """
    Simulates a system health check.
    Returns a dictionary with health status.
    """
    status = {
        "cpu_usage": "25%",
        "memory_usage": "40%",
        "disk_space": "70% used",
        "network_status": "OK",
        "services_running": ["web_server", "database", "api_gateway"],
        "timestamp": datetime.datetime.now().isoformat()
    }
    return status

if __name__ == "__main__":
    try:
        result = run_system_health_check()
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e), "status": "failed"}), file=sys.stderr)
        sys.exit(1)
        