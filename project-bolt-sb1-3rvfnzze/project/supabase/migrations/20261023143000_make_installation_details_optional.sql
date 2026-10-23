/*
  # Make installation details optional

  The admin panel allows saving an installation before all project details
  or savings information are available.
*/

ALTER TABLE installations
  ALTER COLUMN title DROP NOT NULL,
  ALTER COLUMN location DROP NOT NULL,
  ALTER COLUMN system_size DROP NOT NULL,
  ALTER COLUMN panels_used DROP NOT NULL,
  ALTER COLUMN inverter_used DROP NOT NULL,
  ALTER COLUMN monthly_savings DROP NOT NULL;
