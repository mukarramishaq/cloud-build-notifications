export enum HashType {
    NONE = "NONE",
    SHA256 = "SHA256",
    MD5 = "MD5",
}

export enum VerifyOption {
    NOT_VERIFIED = "NOT_VERIFIED",
    VERIFIED = "VERIFIED",
}

export enum MachineType {
    UNSPECIFIED = "UNSPECIFIED",
    N1_HIGHCPU_8 = "N1_HIGHCPU_8",
    N1_HIGHCPU_32 = "N1_HIGHCPU_32",
    E2_HIGHCPU_8 = "E2_HIGHCPU_8",
    E2_HIGHCPU_32 = "E2_HIGHCPU_32",
}

export enum SubstitutionOption {
    MUST_MATCH = "MUST_MATCH",
    ALLOW_LOOSE = "ALLOW_LOOSE",
}

export enum LogStreamingOption {
    STREAM_DEFAULT = "STREAM_DEFAULT", // Service may automatically determine build log streaming behavior.
    STREAM_ON = "STREAM_ON", // Build logs should be streamed to Google Cloud Storage.
    STREAM_OFF = "STREAM_OFF", // Build logs should not be streamed to Google Cloud Storage; they will be written when the build is completed.
}
export enum LoggingMode {
    LOGGING_UNSPECIFIED = "", // The service determines the logging mode. The default is LEGACY. Do not rely on the default logging behavior as it may change in the future.
    LEGACY = "", // Cloud Logging and Cloud Storage logging are enabled.
    GCS_ONLY = "", // Only Cloud Storage logging is enabled.
    STACKDRIVER_ONLY = "", // This option is the same as CLOUD_LOGGING_ONLY. //This item is deprecated!
    CLOUD_LOGGING_ONLY = "", // Only Cloud Logging is enabled. Note that logs for both the Cloud Console UI and Cloud SDK are based on Cloud Storage logs, so neither will provide logs if this option is chosen.
    NONE = "", // Turn off all logging. No build logs will be captured.
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
    EXPIRED = "EXPIRED",
}

export enum StatuseMessage {
    STATUS_UNKNOWN = "Status of the build is unknown.",
    QUEUED = "Build is queued; work has not yet begun.",
    WORKING = "Build is being executed.",
    SUCCESS = "Build finished successfully.",
    FAILURE = "Build failed to complete successfully.",
    INTERNAL_ERROR = "Build failed due to an internal cause.",
    TIMEOUT = "Build took longer than allowed.",
    CANCELLED = "Build was canceled by a user.",
    EXPIRED = "Build was enqueued for longer than the value of queueTtl.",
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
    EXPIRED = "https://banner2.cleanpng.com/20180401/hqw/kisspng-headstone-cemetery-grave-clip-art-headstone-5ac05dfd054886.6432457615225564130217.jpg",
}

export enum FieldNames {
    REPO_NAME = "REPO_NAME",
    BRANCH_NAME = "BRANCH_NAME",
    SHORT_SHA = "SHORT_SHA",
    COMMIT_SHA = "COMMIT_SHA",
    REVISION_ID = "REVISION_ID",
    TRIGGER_NAME = "TRIGGER_NAME",
    LOG_URL = "LOG_URL",
    STATUS = "STATUS",
    START_TIME = "START_TIME",
    FINISH_TIME = "FINISH_TIME",
    TIME_SPAN = "TIME_SPAN",
}
