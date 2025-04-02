import pandas as pd
import sqlite3
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def load_csv_to_dataframe(csv_path: str) -> pd.DataFrame:
    path = Path(csv_path)
    if not path.exists():
        raise FileNotFoundError(f"CSV file not found: {csv_path}")

    df = pd.read_csv(path)
    logger.info(f"Loaded CSV with shape: {df.shape}")
    return df


def ensure_unique_ids(df: pd.DataFrame) -> pd.DataFrame:
    if "ID" not in df.columns or df["ID"].isnull().any() or not df["ID"].is_unique:
        logger.warning("Creating or reinitializing unique 'ID' column.")
        df = df.drop(columns=["ID"], errors="ignore")  # Remove existing ID if invalid
        df.insert(0, "ID", range(1, len(df) + 1))  # Add unique sequential IDs
    return df


def insert_dataframe_to_sqlite(
    df: pd.DataFrame, db_path: str, table_name: str, if_exists: str = "replace"
):
    df = ensure_unique_ids(df)
    conn = sqlite3.connect(db_path)
    try:
        df.to_sql(table_name, conn, if_exists=if_exists, index=False)
        logger.info(f"Inserted {df.shape[0]} rows into '{table_name}'")
    finally:
        conn.close()
