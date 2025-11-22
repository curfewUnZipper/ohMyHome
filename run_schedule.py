# run_schedule.py
import os, sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

from ohmyml.schedule.appliance_scheduler import generate_schedule

print("📅 Running schedule generator...")
generate_schedule("living_room")
print("✔ Done — saved in MongoDB.")
