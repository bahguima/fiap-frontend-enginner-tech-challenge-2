
    export type RemoteKeys = 'institutional/App';
    type PackageType<T> = T extends 'institutional/App' ? typeof import('institutional/App') :any;