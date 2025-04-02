import subprocess
from pathlib import Path
import os

root_dir = Path(__file__).resolve().parent.parent.parent
csv_path = root_dir / "datasets" / "kaggle-car-prices" / "train.csv"
db_path = root_dir / "data" / "car_prices.db"

# Delete existing DB if it exists
if db_path.exists():
    db_path.unlink()

cmd = [
    "python",
    "-m",
    "util.csv_to_sqlite.cli",
    str(csv_path),
    "--table",
    "car_prices",
    "--db",
    str(db_path),
]

subprocess.run(cmd, check=True)
