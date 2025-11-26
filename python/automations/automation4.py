import json
import datetime
import sys
import random

def run_user_activity_report():
    """
    Simulates generating a user activity report.
    Returns a list of recent user actions.
    """
    users = ["alice", "bob", "charlie", "diana"]
    actions = ["login", "logout", "view_dashboard", "update_profile", "execute_automation"]
    recent_activities = []

    for _ in range(random.randint(5, 15)): # Simulate 5 to 15 activities
        user = random.choice(users)
        action = random.choice(actions)
        timestamp = (datetime.datetime.now() - datetime.timedelta(minutes=random.randint(1, 60))).isoformat()
        recent_activities.append({
            "user": user,
            "action": action,
            "timestamp": timestamp,
            "details": f"User {user} performed {action}."
        })

    report = {
        "report_date": datetime.date.today().isoformat(),
        "total_activities": len(recent_activities),
        "activities": sorted(recent_activities, key=lambda x: x['timestamp'], reverse=True),
        "generated_by": "Automation System"
    }
    return report

if __name__ == "__main__":
    try:
        result = run_user_activity_report()
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e), "status": "failed"}), file=sys.stderr)
        sys.exit(1)