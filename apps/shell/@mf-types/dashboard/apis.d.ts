
    export type RemoteKeys = 'dashboard/App';
    type PackageType<T> = T extends 'dashboard/App' ? typeof import('dashboard/App') :any;