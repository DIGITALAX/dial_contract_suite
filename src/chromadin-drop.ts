import { Address, ByteArray, Bytes, store } from "@graphprotocol/graph-ts";
import {
  AccessControlUpdated as AccessControlUpdatedEvent,
  ChromadinCollectionUpdated as ChromadinCollectionUpdatedEvent,
  ChromadinDrop,
  CollectionAddedToDrop as CollectionAddedToDropEvent,
  CollectionRemovedFromDrop as CollectionRemovedFromDropEvent,
  DropCreated as DropCreatedEvent,
  DropDeleted as DropDeletedEvent,
  DropURIUpdated as DropURIUpdatedEvent,
} from "../generated/ChromadinDrop/ChromadinDrop";
import {
  AccessControlUpdated,
  ChromadinCollectionUpdated,
  CollectionAddedToDrop,
  CollectionRemovedFromDrop,
  DropCreated,
  DropDeleted,
  DropURIUpdated,
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

export function handleCollectionAddedToDrop(
  event: CollectionAddedToDropEvent
): void {
  let entity = new CollectionAddedToDrop(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.dropId = event.params.dropId;
  entity.collectionId = event.params.collectionId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let mintedEntity = DropCreated.load(
    Bytes.fromByteArray(ByteArray.fromBigInt(event.params.collectionId))
  );
  if (mintedEntity !== null) {
    mintedEntity.collectionIds.push(event.params.collectionId);
    mintedEntity.save();
  }

  entity.save();
}

export function handleCollectionRemovedFromDrop(
  event: CollectionRemovedFromDropEvent
): void {
  let entity = new CollectionRemovedFromDrop(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.dropId = event.params.dropId;
  entity.collectionId = event.params.collectionId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let mintedEntity = DropCreated.load(
    Bytes.fromByteArray(ByteArray.fromBigInt(event.params.collectionId))
  );
  if (mintedEntity !== null) {
    const collectionIds = mintedEntity.collectionIds;
    const collectionIdToRemove = event.params.collectionId;

    const indexToRemove = collectionIds.indexOf(collectionIdToRemove);
    if (indexToRemove !== -1) {
      collectionIds.splice(indexToRemove, 1);
      mintedEntity.collectionIds = collectionIds;
      mintedEntity.save();
    }
  }

  entity.save();
}

export function handleDropCreated(event: DropCreatedEvent): void {
  let entity = new DropCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.dropId = event.params.dropId;
  entity.collectionIds = event.params.collectionIds;
  entity.creator = event.params.creator;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  let contract = ChromadinDrop.bind(
    Address.fromString("0x66f5320fDA50b9090C8508B81C678F477b77ec4c")
  );
  entity.dropURI = contract.getDropURI(event.params.dropId);
  entity.save();
}

export function handleDropDeleted(event: DropDeletedEvent): void {
  let entity = new DropDeleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  let entityId = event.params.dropId;
  let entityDelete = DropCreated.load(
    Bytes.fromByteArray(Bytes.fromBigInt(entityId))
  );

  entity.dropId = event.params.dropId;
  entity.deleter = event.params.deleter;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  if (entityDelete) {
    store.remove("DropCreated", entityDelete.transactionHash.toString());
  }
  entity.save();
}

export function handleDropURIUpdated(event: DropURIUpdatedEvent): void {
  let entity = new DropURIUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.dropId = event.params.dropId;
  entity.dropURI = event.params.dropURI;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
