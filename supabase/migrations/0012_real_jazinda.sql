-- Custom SQL migration file, put you code below! --
CREATE TYPE progress AS ENUM (
  'pending',
  'inprogress',
  'done',
)

CREATE TYPE priority AS ENUM (
  'low',
  'medium',
  'high',
  'urgent'
)