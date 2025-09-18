-- 1) Trigger function: updates last_modified before any UPDATE
CREATE OR REPLACE FUNCTION set_last_modified_ts()
RETURNS TRIGGER AS $$
BEGIN
  -- Only touch the timestamp if something actually changed
  IF ROW(NEW.*) IS DISTINCT FROM ROW(OLD.*) THEN
    NEW.last_modified := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2) Drop any existing trigger (idempotent migration-friendly)
DROP TRIGGER IF EXISTS trg_plan_submission_last_modified
ON plan_submission;

-- 3) Create the trigger
CREATE TRIGGER trg_plan_submission_last_modified
BEFORE UPDATE ON plan_submission
FOR EACH ROW
EXECUTE FUNCTION set_last_modified_ts();