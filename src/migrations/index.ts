import * as migration_20260818_151928_initial_baseline from './20260818_151928_initial_baseline';
import * as migration_20260818_172554_add_organizations_modules from './20260818_172554_add_organizations_modules';
import * as migration_20260818_172624_remove_team_topics from './20260818_172624_remove_team_topics';
import * as migration_20260819_023404_add_workshop_leads from './20260819_023404_add_workshop_leads';

export const migrations = [
  {
    up: migration_20260818_151928_initial_baseline.up,
    down: migration_20260818_151928_initial_baseline.down,
    name: '20260818_151928_initial_baseline',
  },
  {
    up: migration_20260818_172554_add_organizations_modules.up,
    down: migration_20260818_172554_add_organizations_modules.down,
    name: '20260818_172554_add_organizations_modules',
  },
  {
    up: migration_20260818_172624_remove_team_topics.up,
    down: migration_20260818_172624_remove_team_topics.down,
    name: '20260818_172624_remove_team_topics',
  },
  {
    up: migration_20260819_023404_add_workshop_leads.up,
    down: migration_20260819_023404_add_workshop_leads.down,
    name: '20260819_023404_add_workshop_leads'
  },
];
