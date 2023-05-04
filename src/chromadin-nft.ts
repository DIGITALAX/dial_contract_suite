import { Bytes } from "@graphprotocol/graph-ts";
import {
  AccessControlUpdated as AccessControlUpdatedEvent,
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BatchTokenMinted as BatchTokenMintedEvent,
  ChromadinCollectionUpdated as ChromadinCollectionUpdatedEvent,
  ChromadinEscrowUpdated as ChromadinEscrowUpdatedEvent,
  TokenAcceptedTokensUpdated as TokenAcceptedTokensUpdatedEvent,
  TokenBasePriceUpdated as TokenBasePriceUpdatedEvent,
  TokenBurned as TokenBurnedEvent,
  TokenFulfillmentUpdated as TokenFulfillmentUpdatedEvent,
  TokenURIUpdated as TokenURIUpdatedEvent,
  Transfer as TransferEvent,
} from "../generated/ChromadinNFT/ChromadinNFT";
import {
  AccessControlUpdated,
  Approval,
  ApprovalForAll,
  BatchTokenMinted,
  ChromadinCollectionUpdated,
  ChromadinEscrowUpdated,
  TokenAcceptedTokensUpdated,
  TokenBasePriceUpdated,
  TokenBurned,
  TokenFulfillmentUpdated,
  TokenURIUpdated,
  Transfer,
} from "../generated/schema";

export function handleAccessControlUpdated(
  event: AccessControlUpdatedEvent
): void {
  let entity = new AccessControlUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldAccessControl = event.params.oldAccessControl;
  entity.newAccessControl = event.params.newAccessControl;
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBatchTokenMinted(event: BatchTokenMintedEvent): void {
  let entity = new BatchTokenMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.to = event.params.to;
  entity.tokenIds = event.params.tokenIds;
  entity.uri = event.params.uri;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleChromadinCollectionUpdated(
  event: ChromadinCollectionUpdatedEvent
): void {
  let entity = new ChromadinCollectionUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldChromadinCollection = event.params.oldChromadinCollection;
  entity.newChromadinCollection = event.params.newChromadinCollection;
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleChromadinEscrowUpdated(
  event: ChromadinEscrowUpdatedEvent
): void {
  let entity = new ChromadinEscrowUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldChromadinEscrow = event.params.oldChromadinEscrow;
  entity.newChromadinEscrow = event.params.newChromadinEscrow;
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenAcceptedTokensUpdated(
  event: TokenAcceptedTokensUpdatedEvent
): void {
  let entity = new TokenAcceptedTokensUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.oldAcceptedTokens = event.params.oldAcceptedTokens.map<Bytes>(
    (target: Bytes) => target
  );
  entity.newAcceptedTokens = event.params.newAcceptedTokens.map<Bytes>(
    (target: Bytes) => target
  );
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenBasePriceUpdated(
  event: TokenBasePriceUpdatedEvent
): void {
  let entity = new TokenBasePriceUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.oldPrice = event.params.oldPrice;
  entity.newPrice = event.params.newPrice;
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenBurned(event: TokenBurnedEvent): void {
  let entity = new TokenBurned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenFulfillmentUpdated(
  event: TokenFulfillmentUpdatedEvent
): void {
  let entity = new TokenFulfillmentUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenURIUpdated(event: TokenURIUpdatedEvent): void {
  let entity = new TokenURIUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.oldURI = event.params.oldURI;
  entity.newURI = event.params.newURI;
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
