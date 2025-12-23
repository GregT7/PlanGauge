-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Category table
CREATE TABLE category (
  cat_id SERIAL PRIMARY KEY,
  subject VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  CONSTRAINT UQ_category_subject_type UNIQUE (subject, type)
);

-- Work table
CREATE TABLE work (
  work_id SERIAL PRIMARY KEY,
  completion_date DATE,
  task_name VARCHAR(255),
  start_time TIME,
  end_time TIME
);

-- Plan submission table
CREATE TABLE plan_submission (
  submission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (sync_status IN ('pending','success','failed')),
  synced_with_notion BOOLEAN NOT NULL DEFAULT FALSE,
  sync_attempts INT NOT NULL DEFAULT 0
    CHECK (sync_attempts >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_modified TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  filter_start_date DATE NOT NULL DEFAULT '2023-08-13',
  filter_end_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Assignment table
CREATE TABLE assignment (
  aid SERIAL PRIMARY KEY,
  assign_name VARCHAR(255) NOT NULL,
  cat_id INTEGER NOT NULL,
  CONSTRAINT FK_assignment_cat_id
    FOREIGN KEY (cat_id)
    REFERENCES category(cat_id)
    ON DELETE RESTRICT
);

-- General work table
CREATE TABLE general_work (
  work_id INTEGER PRIMARY KEY,
  cat_id INTEGER NOT NULL,
  CONSTRAINT FK_general_work_work_id
    FOREIGN KEY (work_id)
    REFERENCES work(work_id)
    ON DELETE CASCADE,
  CONSTRAINT FK_general_work_cat_id
    FOREIGN KEY (cat_id)
    REFERENCES category(cat_id)
    ON DELETE RESTRICT
);

-- Assigned work table
CREATE TABLE assigned_work (
  work_id INTEGER PRIMARY KEY,
  aid INTEGER NOT NULL,
  CONSTRAINT FK_assigned_work_work_id
    FOREIGN KEY (work_id)
    REFERENCES work(work_id)
    ON DELETE CASCADE,
  CONSTRAINT FK_assigned_work_aid
    FOREIGN KEY (aid)
    REFERENCES assignment(aid)
    ON DELETE RESTRICT
);

-- Plan table
CREATE TABLE plan (
  plan_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_name VARCHAR(255) NOT NULL,
  start_date DATE,
  due_date DATE,
  time_estimation INT4 DEFAULT 0 CHECK (time_estimation >= 0),
  submission_id UUID,
  CONSTRAINT FK_plan_submission_id
    FOREIGN KEY (submission_id)
    REFERENCES plan_submission(submission_id)
    ON DELETE SET NULL
);

-- Assigned plan table
CREATE TABLE assigned_plan (
  plan_id UUID PRIMARY KEY,
  aid INTEGER NOT NULL,
  CONSTRAINT FK_assigned_plan_plan_id
    FOREIGN KEY (plan_id)
    REFERENCES plan(plan_id)
    ON DELETE CASCADE,
  CONSTRAINT FK_assigned_plan_aid
    FOREIGN KEY (aid)
    REFERENCES assignment(aid)
    ON DELETE RESTRICT
);

-- General plan table
CREATE TABLE general_plan (
  plan_id UUID PRIMARY KEY,
  cat_id INTEGER NOT NULL,
  CONSTRAINT FK_general_plan_plan_id
    FOREIGN KEY (plan_id)
    REFERENCES plan(plan_id)
    ON DELETE CASCADE,
  CONSTRAINT FK_general_plan_cat_id
    FOREIGN KEY (cat_id)
    REFERENCES category(cat_id)
    ON DELETE RESTRICT
);

-- Users
CREATE TABLE app_user (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text,
  role text not null check (role in ('owner','guest')) default 'guest',
  created_at timestamptz not null default now()
);

-- Sessions
CREATE TABLE session (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_user(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked boolean not null default false,
  last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW()
);