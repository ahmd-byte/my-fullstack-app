import json
import datetime
import sys
import time
import random

def run_database_backup():
    """
    Simulates a database backup process.
    Returns backup status and details.
    """
    backup_id = f"backup_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}"
    backup_size_mb = random.randint(500, 2000) # Simulate varying backup sizes
    backup_duration_seconds = random.randint(5, 15) # Simulate varying duration

    # Simulate work being done
    time.sleep(backup_duration_seconds / 5) # Sleep for a fifth of the duration to show some delay

    status = {
        "backup_id": backup_id,
        "status": "success",
        "database_name": "production_db",
        "backup_type": "full",
        "size_mb": backup_size_mb,
        "duration_seconds": backup_duration_seconds,
        "start_time": datetime.datetime.now().isoformat(),
        "end_time": (datetime.datetime.now() + datetime.timedelta(seconds=backup_duration_seconds)).isoformat(),
        "storage_location": "/mnt/backups/db/",
        "checksum_verified": True
    }
    return status

if __name__ == "__main__":
    try:
        result = run_database_backup()
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e), "status": "failed"}), file=sys.stderr)
        sys.exit(1)