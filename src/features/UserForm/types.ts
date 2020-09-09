import { User } from 'common/types';

export interface UserFormProps {
    callback?: (isSuccess?: boolean) => any,
    record?: User,
}
