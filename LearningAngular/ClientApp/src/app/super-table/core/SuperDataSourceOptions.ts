import { ISuperDataSourceService } from './SuperDataSourceService';

export class SuperDataSourceOptions<T, TContext> {
  keyProperty = 'key';
  dataService?: ISuperDataSourceService<T, TContext>;
  data?: T[];
  selection?: boolean;
}
