import { Address, ByteArray, Bytes } from "@graphprotocol/graph-ts";
import {
  AccessControlUpdated as AccessControlUpdatedEvent,
  ChromadinCollection,
  ChromadinDropUpdated as ChromadinDropUpdatedEvent,
  ChromadinEscrowUpdated as ChromadinEscrowUpdatedEvent,
  ChromadinNFTUpdated as ChromadinNFTUpdatedEvent,
  ChromadinPaymentUpdated as ChromadinPaymentUpdatedEvent,
  CollectionAcceptedTokensUpdated as CollectionAcceptedTokensUpdatedEvent,
  CollectionBasePricesUpdated as CollectionBasePricesUpdatedEvent,
  CollectionBurned as CollectionBurnedEvent,
  CollectionFulfillmentUpdated as CollectionFulfillmentUpdatedEvent,
  CollectionMinted as CollectionMintedEvent,
  CollectionNameUpdated as CollectionNameUpdatedEvent,
  CollectionURIUpdated as CollectionURIUpdatedEvent,
} from "../generated/ChromadinCollection/ChromadinCollection";
import {
  AccessControlUpdated,
  ChromadinDropUpdated,
  ChromadinEscrowUpdated,
  ChromadinNFTUpdated,
  ChromadinPaymentUpdated,
  CollectionAcceptedTokensUpdated,
  CollectionBasePricesUpdated,
  CollectionBurned,
  CollectionFulfillmentUpdated,
  CollectionMinted,
  CollectionNameUpdated,
  CollectionURIUpdated,
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

export function handleChromadinDropUpdated(
  event: ChromadinDropUpdatedEvent
): void {
  let entity = new ChromadinDropUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldChromadinDrop = event.params.oldChromadinDrop;
  entity.newChromadinDrop = event.params.newChromadinDrop;
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

export function handleChromadinNFTUpdated(
  event: ChromadinNFTUpdatedEvent
): void {
  let entity = new ChromadinNFTUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldChromadinNFT = event.params.oldChromadinNFT;
  entity.newChromadinNFT = event.params.newChromadinNFT;
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleChromadinPaymentUpdated(
  event: ChromadinPaymentUpdatedEvent
): void {
  let entity = new ChromadinPaymentUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldChromadinPayment = event.params.oldChromadinPayment;
  entity.newChromadinPayment = event.params.newChromadinPayment;
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCollectionAcceptedTokensUpdated(
  event: CollectionAcceptedTokensUpdatedEvent
): void {
  let entity = new CollectionAcceptedTokensUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.id = Bytes.fromByteArray(
    ByteArray.fromBigInt(event.params.collectionId)
  );
  entity.collectionId = event.params.collectionId;
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

  let mintedEntity = CollectionMinted.load(
    Bytes.fromByteArray(ByteArray.fromBigInt(event.params.collectionId))
  );
  if (mintedEntity !== null) {
    mintedEntity.acceptedTokens = event.params.newAcceptedTokens.map<Bytes>(
      (target: Bytes) => target
    );
    mintedEntity.save();
  }

  entity.save();
}

export function handleCollectionBasePricesUpdated(
  event: CollectionBasePricesUpdatedEvent
): void {
  let entity = new CollectionBasePricesUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.collectionId = event.params.collectionId;
  entity.oldPrices = event.params.oldPrices;
  entity.newPrices = event.params.newPrices;
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let mintedEntity = CollectionMinted.load(
    Bytes.fromByteArray(ByteArray.fromBigInt(event.params.collectionId))
  );
  if (mintedEntity !== null) {
    mintedEntity.basePrices = event.params.newPrices;
    mintedEntity.save();
  }

  entity.save();
}

export function handleCollectionBurned(event: CollectionBurnedEvent): void {
  let entity = new CollectionBurned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.burner = event.params.burner;
  entity.collectionId = event.params.collectionId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCollectionFulfillmentUpdated(
  event: CollectionFulfillmentUpdatedEvent
): void {
  let entity = new CollectionFulfillmentUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.collectionId = event.params.collectionId;
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCollectionMinted(event: CollectionMintedEvent): void {
  let entity = new CollectionMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.id = Bytes.fromByteArray(
    ByteArray.fromBigInt(event.params.collectionId)
  );
  entity.collectionId = event.params.collectionId;
  entity.name = event.params.name;
  entity.uri = event.params.uri;
  entity.amount = event.params.amount;
  entity.owner = event.params.owner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let contract = ChromadinCollection.bind(
    Address.fromString("0xA2f8D55Ae9b9652a82Fd750B3781a1802Cc5241c")
  );
  entity.acceptedTokens = contract
    .getCollectionAcceptedTokens(event.params.collectionId)
    .map<Bytes>((target: Bytes) => target);
  entity.basePrices = contract.getCollectionBasePrices(
    event.params.collectionId
  );
  entity.tokenIds = contract.getCollectionTokenIds(event.params.collectionId);
  entity.save();
}

export function handleCollectionNameUpdated(
  event: CollectionNameUpdatedEvent
): void {
  let entity = new CollectionNameUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.collectionId = event.params.collectionId;
  entity.oldName = event.params.oldName;
  entity.newName = event.params.newName;
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCollectionURIUpdated(
  event: CollectionURIUpdatedEvent
): void {
  let entity = new CollectionURIUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.id = Bytes.fromByteArray(
    ByteArray.fromBigInt(event.params.collectionId)
  );
  entity.collectionId = event.params.collectionId;
  entity.oldURI = event.params.oldURI;
  entity.newURI = event.params.newURI;
  entity.updater = event.params.updater;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let mintedEntity = CollectionMinted.load(
    Bytes.fromByteArray(ByteArray.fromBigInt(event.params.collectionId))
  );
  if (mintedEntity !== null) {
    mintedEntity.uri = event.params.newURI;
    mintedEntity.save();
  }
}
