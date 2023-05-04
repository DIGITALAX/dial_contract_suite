import { Address, ByteArray, Bytes } from "@graphprotocol/graph-ts";
import {
  AccessControlUpdated as AccessControlUpdatedEvent,
  ChromadinCollectionUpdated as ChromadinCollectionUpdatedEvent,
  ChromadinEscrowUpdated as ChromadinEscrowUpdatedEvent,
  ChromadinMarketplace,
  ChromadinNFTUpdated as ChromadinNFTUpdatedEvent,
  TokensBought as TokensBoughtEvent,
} from "../generated/ChromadinMarketplace/ChromadinMarketplace";
import {
  AccessControlUpdated,
  ChromadinCollectionUpdated,
  ChromadinEscrowUpdated,
  ChromadinNFTUpdated,
  CollectionMinted,
  TokensBought,
} from "../generated/schema";
import { ChromadinNFT } from "../generated/ChromadinNFT/ChromadinNFT";
import { ChromadinCollection } from "../generated/ChromadinCollection/ChromadinCollection";

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

export function handleTokensBought(event: TokensBoughtEvent): void {
  let entity = new TokensBought(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenIds = event.params.tokenIds;
  entity.totalPrice = event.params.totalPrice;
  entity.buyer = event.params.buyer;
  entity.chosenAddress = event.params.chosenAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let marketplace = ChromadinMarketplace.bind(
    Address.fromString("0x0811e237a4357944C3E29f7877A7580525524357")
  );
  let nft = ChromadinNFT.bind(
    Address.fromString("0xcE48B60b97c615c4650F7dF26AD4AFADDc319F1d")
  );
  let collection = ChromadinCollection.bind(
    Address.fromString("0xA2f8D55Ae9b9652a82Fd750B3781a1802Cc5241c")
  );
  const collectionId = nft.getTokenCollection(event.params.tokenIds[0]);
  const name = collection.getCollectionName(collectionId);
  const uri = nft.tokenURI(event.params.tokenIds[0]);
  const creator = nft.getTokenCreator(event.params.tokenIds[0]);

  entity.uri = uri;
  entity.name = name;
  entity.creator = creator;
  entity.save();

  let mintedEntity = CollectionMinted.load(
    Bytes.fromByteArray(ByteArray.fromBigInt(collectionId))
  );
  if (mintedEntity !== null) {
    mintedEntity.soldTokens = marketplace.getTokensSoldCollection(collectionId);
    mintedEntity.save();
  }
}
