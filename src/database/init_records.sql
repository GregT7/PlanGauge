-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===========================
-- CATEGORY TABLE
-- ===========================
INSERT INTO category (cat_id, subject, type)
VALUES 
  (1, 'Computer Science', 'Homework'),
  (2, 'Mathematics', 'Quiz'),
  (3, 'Physics', 'Lab'),
  (4, 'English', 'Essay'),
  (5, 'Biology', 'Presentation'),
  (6, 'Life', 'Chore'),
  (7, 'Career', 'Project');

-- ===========================
-- WORK TABLE
-- ===========================
INSERT INTO work (work_id, completion_date, task_name, start_time, end_time)
VALUES 
  (1, '2025-01-10', 'Binary Tree Implementation', '09:00', '11:00'),
  (2, '2025-01-12', 'Calculus Quiz', '13:00', '14:00'),
  (3, '2025-01-13', 'Thermodynamics Lab', '10:00', '12:30'),
  (4, '2025-01-14', 'Essay Draft', '08:00', '09:30'),
  (5, '2025-01-15', 'Cell Structure Slides', '15:00', '17:00'),
  (6, '2025-01-16', 'Vacuum House', '15:00', '15:45'),
  (7, '2025-01-16', 'Laundry', '15:45', '16:00');

-- ===========================
-- PLAN_SUBMISSION TABLE
-- ===========================
INSERT INTO plan_submission (sync_status, synced_with_notion, sync_attempts, filter_start_date, filter_end_date)
VALUES 
  ('pending', FALSE, 0, '2025-01-01', '2025-01-07'),
  ('success', TRUE, 1, '2025-01-08', '2025-01-14'),
  ('failed', FALSE, 3, '2025-01-15', '2025-01-21');

-- ===========================
-- ASSIGNMENT TABLE
-- ===========================
INSERT INTO assignment (aid, assign_name, cat_id)
VALUES
  (1, 'Binary Tree Homework', 1),
  (2, 'Quiz #3', 2),
  (3, 'Thermo Lab 5', 3),
  (4, 'Essay on Modern Literature', 4),
  (5, 'Bio Presentation', 5),
  (6, 'PlanGauge project', 7),
  (7, 'Mock Interview', 7),
  (8, 'Raspberry Pi project', 7);

-- ===========================
-- GENERAL_WORK TABLE
-- ===========================
INSERT INTO general_work (work_id, cat_id)
VALUES
  (6, 6),
  (7, 6);

-- ===========================
-- ASSIGNED_WORK TABLE
-- ===========================
INSERT INTO assigned_work (work_id, aid)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);

-- ===========================
-- PLAN TABLE
-- ===========================
INSERT INTO plan (plan_name, start_date, due_date, time_estimation, submission_id)
VALUES 
  ('Binary Tree project p1', '2025-01-01', '2025-01-07', 90, (SELECT submission_id FROM plan_submission LIMIT 1)),
  ('Binary Tree project p2', '2025-01-05', '2025-01-05', 45, (SELECT submission_id FROM plan_submission LIMIT 1)),
  ('Thermo Lab #5 p3', '2025-01-05', '2025-01-05', 75, (SELECT submission_id FROM plan_submission LIMIT 1)),
  ('Water lawn', '2025-01-05', '2025-01-05', 40, (SELECT submission_id FROM plan_submission LIMIT 1)),
  ('Bio Presentation pre p6', '2025-01-08', '2025-01-14', 45, (SELECT submission_id FROM plan_submission OFFSET 1 LIMIT 1)),
  ('Bio Presentation pre p7', '2025-01-09', '2025-01-14', 50, (SELECT submission_id FROM plan_submission OFFSET 1 LIMIT 1)),
  ('PlanGauge p230', '2025-01-10', '2025-02-15', 90, (SELECT submission_id FROM plan_submission OFFSET 1 LIMIT 1)),
  ('Mock interview prep p3', '2025-01-10', '2025-01-12', 60, (SELECT submission_id FROM plan_submission OFFSET 1 LIMIT 1)),
  ('Raspberry pi project p5', '2025-01-15', '2025-03-27', 60, (SELECT submission_id FROM plan_submission OFFSET 2 LIMIT 1)),
  ('Quiz #3 p2', '2025-01-17', '2025-01-19', 60, (SELECT submission_id FROM plan_submission OFFSET 2 LIMIT 1)),
  ('Change bed sheets', '2025-01-20', '2025-01-20', 30, (SELECT submission_id FROM plan_submission OFFSET 2 LIMIT 1));

-- ===========================
-- ASSIGNED_PLAN TABLE
-- ===========================
INSERT INTO assigned_plan (plan_id, aid)
VALUES
  ((SELECT plan_id FROM plan LIMIT 1), 1),
  ((SELECT plan_id FROM plan OFFSET 1 LIMIT 1), 1),
  ((SELECT plan_id FROM plan OFFSET 2 LIMIT 1), 3),
  ((SELECT plan_id FROM plan OFFSET 4 LIMIT 1), 5),
  ((SELECT plan_id FROM plan OFFSET 5 LIMIT 1), 5),
  ((SELECT plan_id FROM plan OFFSET 6 LIMIT 1), 6),
  ((SELECT plan_id FROM plan OFFSET 7 LIMIT 1), 7),
  ((SELECT plan_id FROM plan OFFSET 8 LIMIT 1), 8),
  ((SELECT plan_id FROM plan OFFSET 9 LIMIT 1), 2);

-- ===========================
-- GENERAL_PLAN TABLE
-- ===========================
INSERT INTO general_plan (plan_id, cat_id)
VALUES
  ((SELECT plan_id FROM plan OFFSET 3 LIMIT 1), 6),
  ((SELECT plan_id FROM plan OFFSET 10 LIMIT 1), 6);