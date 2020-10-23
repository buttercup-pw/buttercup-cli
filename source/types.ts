import { VaultSourceID, VaultSourceStatus } from "buttercup";

export interface AddVaultPayload {
    initialise?: boolean;
    masterPassword: string;
    name: string;
    path?: string;
    type: DatasourceType;
}

export interface AddVaultResponse {
    sourceID: string;
}

export interface ArgV {
    _?: Array<string>;
    daemon?: boolean;
    help?: boolean;
    verbose?: boolean;
    version?: boolean;
    h?: boolean;
    v?: boolean;
}

export interface ArgVAddVault extends ArgV {
    _: ["vaults" | "vault"];
    name?: string;
    type?: DatasourceType
}

export interface ArgVList extends ArgV {
    _: ["vaults" | "vault"];
    output?: "json" | "table";
}

export interface ArgVLock extends ArgV {
    all?: boolean;
    id?: UUID;
    index?: number;
}

export interface ArgVUnlock extends ArgV {
    id?: UUID;
    index?: number;
}

export enum DaemonCommand {
    AddVault = "add-vault",
    ListSources = "list-sources",
    LockSources = "lock-sources",
    Shutdown = "shutdown",
    UnlockSource = "unlock-source"
}

export interface DaemonRequest {
    type: DaemonCommand;
    payload?: AddVaultPayload | ListSourcesPayload | LockSourcesPayload | UnlockSourcePayload;
}

export interface DaemonResponse {
    error?: string;
    payload?: AddVaultResponse | ListSourcesResponse | LockSourcesResponse | UnlockSourceResponse;
    status: DaemonResponseStatus;
}

export enum DaemonResponseStatus {
    Error = "error",
    OK = "ok"
}

export enum DatasourceType {
    File = "file",
    MyButtercup = "mybuttercup"
}

export interface ListSourcesPayload {
    locked: boolean;
    unlocked: boolean;
}

export interface ListSourcesResponse {
    sources: Array<VaultDescription>;
}

export interface LockSourcesPayload {
    all: boolean;
    id?: UUID;
    index?: number;
}

export interface LockSourcesResponse {
    lockedIDs: Array<UUID>;
    lockedIndexes: Array<number>;
}

export interface RSAKeyPair {
    public: string;
    private: string;
}

export interface UnlockSourcePayload {
    id?: UUID;
    index?: number;
    masterPassword?: string;
}

export interface UnlockSourceResponse {
    vault: VaultDescription;
}

export type UUID = string;

export interface VaultDescription {
    id: VaultSourceID;
    index: number;
    name: string;
    order: number;
    status: VaultSourceStatus;
    type: DatasourceType;
}
