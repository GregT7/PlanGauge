-- Table: category
CREATE TABLE "category" (
 "cat_id" SERIAL PRIMARY KEY,
 "subject" VARCHAR(255) NOT NULL,
 "type" VARCHAR(255) NOT NULL,

 CONSTRAINT "UQ_category_subject_type" UNIQUE ("subject","type")
);

-- Table: work
CREATE TABLE "work" (
  "work_id" SERIAL PRIMARY KEY,
  "completion_date" DATE,
  "task_name" VARCHAR(255),
  "start_time" TIME,
  "end_time" TIME
);

-- Table: plan_submission
-- The earliest data record date was August 13, 2025 hence the default '2025-08-13'
CREATE TABLE plan_submission (
  submission_id SERIAL PRIMARY KEY,
  sync_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (sync_status IN ('pending','success','failed')),
  synced_with_notion BOOLEAN NOT NULL DEFAULT FALSE,
  sync_attempts INT NOT NULL DEFAULT 0
    CHECK (sync_attempts >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_modified TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  filter_start_date DATE NOT NULL DEFAULT '2025-08-13',
  filter_end_date DATE NOT NULL DEFAULT CURRENT_DATE
);


-- Table: assignment
CREATE TABLE "assignment" (
  "aid" SERIAL PRIMARY KEY,
  "assign_name" VARCHAR(255) NOT NULL,
  "cat_id" INTEGER NOT NULL,
  CONSTRAINT "FK_assignment_cat_id"
    FOREIGN KEY ("cat_id")
    REFERENCES "category"("cat_id")
    ON DELETE RESTRICT
);

-- Table: general_work
CREATE TABLE "general_work" (
  "work_id" INTEGER PRIMARY KEY,
  "cat_id" INTEGER NOT NULL,

  CONSTRAINT "FK_general_work_work_id"
    FOREIGN KEY ("work_id")
    REFERENCES "work"("work_id")
    ON DELETE CASCADE,

  CONSTRAINT "FK_general_work_cat_id"
    FOREIGN KEY ("cat_id")
    REFERENCES "category"("cat_id")
    ON DELETE RESTRICT
);

-- Table: assigned_work
CREATE TABLE "assigned_work" (
  "work_id" INTEGER PRIMARY KEY,
  "aid" INTEGER NOT NULL,

  CONSTRAINT "FK_assigned_work_work_id"
    FOREIGN KEY ("work_id")
    REFERENCES "work"("work_id")
    ON DELETE CASCADE,

  CONSTRAINT "FK_assigned_work_aid"
    FOREIGN KEY ("aid")
    REFERENCES "assignment"("aid")
    ON DELETE RESTRICT
);

-- Table: plan
CREATE TABLE "plan" (
  "plan_id" SERIAL PRIMARY KEY,
  "plan_name" VARCHAR(255) NOT NULL,
  "start_date" DATE,
  "due_date" DATE,
  "submission_id" INTEGER,

  CONSTRAINT "FK_plan_submission_id"
    FOREIGN KEY ("submission_id")
    REFERENCES "plan_submission"("submission_id")
    ON DELETE SET NULL
);

-- Table: assigned_plan
CREATE TABLE "assigned_plan" (
  "plan_id" INTEGER PRIMARY KEY,
  "aid" INTEGER NOT NULL,

  CONSTRAINT "FK_assigned_plan_plan_id"
    FOREIGN KEY ("plan_id")
    REFERENCES "plan"("plan_id")
    ON DELETE CASCADE,

  CONSTRAINT "FK_assigned_plan_aid"
    FOREIGN KEY ("aid")
    REFERENCES "assignment"("aid")
    ON DELETE RESTRICT
);

-- Table: general_plan
CREATE TABLE "general_plan" (
  "plan_id" INTEGER PRIMARY KEY,
  "cat_id" INTEGER NOT NULL,

  CONSTRAINT "FK_assigned_plan_plan_id"
    FOREIGN KEY ("plan_id")
    REFERENCES "plan"("plan_id")
    ON DELETE CASCADE,

  CONSTRAINT "FK_general_plan_cat_id"
    FOREIGN KEY ("cat_id")
    REFERENCES "category"("cat_id")
    ON DELETE RESTRICT
);