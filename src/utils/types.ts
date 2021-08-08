import {
    HashType,
    LoggingMode,
    LogStreamingOption,
    MachineType,
    Status,
    SubstitutionOption,
    VerifyOption,
} from "./constants";

export type MessageType = {
    message: {
        attributes: {
            buildId: string;
            status: string;
        };
        data: string;
        messageId: string;
        publishTime: string;
    };
    subscription: string;
};

export type BuildResourceType = {
    name: string;
    id: string;
    projectId: string;
    status: Status;
    statusDetail: string;
    source: Source;
    steps: BuildStep[];
    results: Results;
    createTime: string;
    startTime: string;
    finishTime: string;
    timeout: string;
    images: [string];
    queueTtl: string;
    artifacts: Artifacts;
    logsBucket: string;
    sourceProvenance: SourceProvenance;
    buildTriggerId: string;
    options: BuildOptions;
    logUrl: string;
    substitutions: {
        [name: string]: string;
    };
    tags: [string];
    secrets: Secret[];
    timing: {
        [name: string]: TimeSpan;
    };
    serviceAccount: string;
    availableSecrets: Secrets;
};

export type Secret = {
    kmsKeyName: string;
    secretEnv: {
        [name: string]: string;
    };
};
export type Secrets = {
    secretManager: SecretManagerSecret[];
    inline: InlineSecret[];
};
export type SecretManagerSecret = {
    versionName: string;
    env: string;
};
export type InlineSecret = {
    kmsKeyName: string;
    envMap: {
        [name: string]: string;
    };
};

export type BuildStep = {
    name: string;
    env: string[];
    args: string[];
    dir: string;
    id: string;
    waitFor: string[];
    entrypoint: string;
    secretEnv: string[];
    volumes: Volume[];
    timing: TimeSpan;
    pullTiming: TimeSpan;
    timeout: string;
    status: Status;
};

export type TimeSpan = {
    startTime: string;
    endTime: string;
};

export type Volume = {
    name: string;
    path: string;
};

export type Source = {
    // Union field source can be only one of the following:
    storageSource?: StorageSource;
    repoSource?: RepoSource;
    // End of list of possible types for union field source.
};

export type StorageSource = {
    bucket: string;
    object: string;
    generation: string;
};

export type RepoSource = {
    projectId: string;
    repoName: string;
    dir: string;
    invertRegex: boolean;
    substitutions: {
        [name: string]: string;
    };
    // Union field revision can be only one of the following:
    branchName?: string;
    tagName?: string;
    commitSha?: string;
    // End of list of possible types for union field revision.
};

export type Results = {
    images: BuiltImage[];
    buildStepImages: string[];
    artifactManifest: string;
    numArtifacts: string;
    buildStepOutputs: string[];
    artifactTiming: TimeSpan;
};

export type BuiltImage = {
    name: string;
    digest: string;
    pushTiming: TimeSpan;
};

export type Artifacts = {
    images: string[];
    objects: ArtifactObjects;
};
export type ArtifactObjects = {
    location: string;
    paths: string[];
    timing: TimeSpan;
};

export type SourceProvenance = {
    resolvedStorageSource: StorageSource;
    resolvedRepoSource: RepoSource;
    fileHashes: {
        [name: string]: any; // FileHashes,
    };
};

export type BuildOptions = {
    sourceProvenanceHash: HashType[];
    requestedVerifyOption: VerifyOption;
    machineType: MachineType;
    diskSizeGb: string;
    substitutionOption: SubstitutionOption;
    dynamicSubstitutions: boolean;
    logStreamingOption: LogStreamingOption;
    workerPool: string;
    logging: LoggingMode;
    env: string[];
    secretEnv: string[];
    volumes: Volume[];
};
