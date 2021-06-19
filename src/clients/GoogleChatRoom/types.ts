export type MessageType = {
    message: {
        attributes: {
            buildId: string,
            status: string
        },
        data: string
        messageId: string,
        publishTime: string
    },
    subscription: string
};

export type BuildResourceType = {
    name: string,
    id: string,
    projectId: string,
    status: Status,
    statusDetail: string,
    source: Source,
    steps: BuildStep[],
    results: Results,
    createTime: string,
    startTime: string,
    finishTime: string,
    timeout: string,
    images: [
        string
    ],
    queueTtl: string,
    artifacts: Artifacts,
    logsBucket: string,
    sourceProvenance: SourceProvenance,
    buildTriggerId: string,
    options: BuildOptions,
    logUrl: string,
    substitutions: {
        [name: string]: string,
    },
    tags: [
        string
    ],
    secrets: Secret[],
    timing: {
        [name: string]: TimeSpan,
    },
    serviceAccount: string,
    availableSecrets: Secrets
}

export type Secret = {
    kmsKeyName: string,
    secretEnv: {
        [name: string]: string,
    }
}
export type Secrets = {
    secretManager: SecretManagerSecret[],
    inline: InlineSecret[]
}
export type SecretManagerSecret = {
    versionName: string,
    env: string
}
export type InlineSecret = {
    kmsKeyName: string,
    envMap: {
        [name: string]: string,
    }
}

export type BuildStep = {
    name: string,
    env: string[],
    args: string[],
    dir: string,
    id: string,
    waitFor: string[],
    entrypoint: string,
    secretEnv: string[],
    volumes: Volume[],
    timing: TimeSpan,
    pullTiming: TimeSpan,
    timeout: string,
    status: Status
}

export type TimeSpan = {
    startTime: string,
    endTime: string
}

export type Volume = {
    name: string,
    path: string
}

export type Source = {
    // Union field source can be only one of the following:
    storageSource?: StorageSource,
    repoSource?: RepoSource
    // End of list of possible types for union field source.
}

export type StorageSource = {
    bucket: string,
    object: string,
    generation: string
}

export type RepoSource = {
    projectId: string,
    repoName: string,
    dir: string,
    invertRegex: boolean,
    substitutions: {
        [name: string]: string,
    },
    // Union field revision can be only one of the following:
    branchName?: string,
    tagName?: string,
    commitSha?: string
    // End of list of possible types for union field revision.
}

export type Results = {
    images: BuiltImage[],
    buildStepImages: string[],
    artifactManifest: string,
    numArtifacts: string,
    buildStepOutputs: string[],
    artifactTiming: TimeSpan
}

export type BuiltImage = {
    name: string,
    digest: string,
    pushTiming: TimeSpan
}

export type Artifacts = {
    images: string[],
    objects: ArtifactObjects
}
export type ArtifactObjects = {
    location: string,
    paths: string[],
    timing: TimeSpan
}

export type SourceProvenance = {
    resolvedStorageSource: StorageSource,
    resolvedRepoSource: RepoSource,
    fileHashes: {
        [name: string]: any, // FileHashes,
    }
}

export type BuildOptions = {
    sourceProvenanceHash: HashType[],
    requestedVerifyOption: VerifyOption,
    machineType: MachineType,
    diskSizeGb: string,
    substitutionOption: SubstitutionOption,
    dynamicSubstitutions: boolean,
    logStreamingOption: LogStreamingOption,
    workerPool: string,
    logging: LoggingMode,
    env: string[],
    secretEnv: string[],
    volumes: Volume[]
}

export enum HashType {
    NONE = "NONE",
    SHA256 = "SHA256",
    MD5 = "MD5"
}

export enum VerifyOption {
    NOT_VERIFIED = "NOT_VERIFIED",
    VERIFIED = "VERIFIED"
}

export enum MachineType {
    UNSPECIFIED = "UNSPECIFIED",
    N1_HIGHCPU_8 = "N1_HIGHCPU_8",
    N1_HIGHCPU_32 = "N1_HIGHCPU_32",
    E2_HIGHCPU_8 = "E2_HIGHCPU_8",
    E2_HIGHCPU_32 = "E2_HIGHCPU_32"
}

export enum SubstitutionOption {
    MUST_MATCH = "MUST_MATCH",
    ALLOW_LOOSE = "ALLOW_LOOSE"
}

export enum LogStreamingOption {
    STREAM_DEFAULT = "STREAM_DEFAULT", // Service may automatically determine build log streaming behavior.
    STREAM_ON = "STREAM_ON", // Build logs should be streamed to Google Cloud Storage.
    STREAM_OFF = "STREAM_OFF" // Build logs should not be streamed to Google Cloud Storage; they will be written when the build is completed.
}
export enum LoggingMode {
    LOGGING_UNSPECIFIED = "", // The service determines the logging mode. The default is LEGACY. Do not rely on the default logging behavior as it may change in the future.
    LEGACY = "", // Cloud Logging and Cloud Storage logging are enabled.
    GCS_ONLY = "", // Only Cloud Storage logging is enabled.
    STACKDRIVER_ONLY = "", // This option is the same as CLOUD_LOGGING_ONLY. //This item is deprecated!
    CLOUD_LOGGING_ONLY = "", // Only Cloud Logging is enabled. Note that logs for both the Cloud Console UI and Cloud SDK are based on Cloud Storage logs, so neither will provide logs if this option is chosen.
    NONE = "" // Turn off all logging. No build logs will be captured.
}
export enum Status {
    STATUS_UNKNOWN = "STATUS_UNKNOWN",
    QUEUED = "QUEUED",
    WORKING = "WORKING",
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    TIMEOUT = "TIMEOUT",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED"
}

export enum StatuseMessage {
    STATUS_UNKNOWN = "Status of the build is unknown.",
    QUEUED = "Build or step is queued; work has not yet begun.",
    WORKING = "Build or step is being executed.",
    SUCCESS = "Build or step finished successfully.",
    FAILURE = "Build or step failed to complete successfully.",
    INTERNAL_ERROR = "Build or step failed due to an internal cause.",
    TIMEOUT = "Build or step took longer than was allowed.",
    CANCELLED = "Build or step was canceled by a user.",
    EXPIRED = "Build was enqueued for longer than the value of queueTtl."
}

export enum StatusIcon {
    STATUS_UNKNOWN = "https://banner2.cleanpng.com/20171218/bd4/question-mark-png-5a381243a27317.0340541615136241316654.jpg",
    QUEUED = "https://banner2.cleanpng.com/20180221/ztq/kisspng-tour-bus-service-school-bus-download-silhouette-bus-vector-5a8d93a62ed9d8.4132668015192278141919.jpg",
    WORKING = "https://banner2.cleanpng.com/20180502/brq/kisspng-computer-icons-employment-discrimination-drawing-c-works-5ae97526a32c24.6439408815252493186684.jpg",
    SUCCESS = "https://banner2.cleanpng.com/20171202/b4a/success-png-image-5a229eaff3dc00.4133076515122182879989.jpg",
    FAILURE = "https://banner2.cleanpng.com/20171202/df4/red-cross-mark-download-png-5a2245b1788c42.6100558715121955054938.jpg",
    INTERNAL_ERROR = "https://banner2.cleanpng.com/20180625/zxl/kisspng-samsung-galaxy-s4-mini-computer-icons-error-high-risk-5b31aecf941391.0109336815299826716065.jpg",
    TIMEOUT = "https://banner2.cleanpng.com/20180320/rue/kisspng-error-computer-icons-orange-error-icon-5ab143d3089ac7.8478409115215666750353.jpg",
    CANCELLED = "https://banner2.cleanpng.com/20180328/ioe/kisspng-error-fault-computer-icons-clip-art-cancel-button-5abbe21d07bb82.5748686415222625570317.jpg",
    EXPIRED = "https://banner2.cleanpng.com/20180401/hqw/kisspng-headstone-cemetery-grave-clip-art-headstone-5ac05dfd054886.6432457615225564130217.jpg"
}