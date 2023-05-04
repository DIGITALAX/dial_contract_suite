import {
  AccessControlUpdated as AccessControlUpdatedEvent,
  ChromadinCollectionUpdated as ChromadinCollectionUpdatedEvent,
  ChromadinMarketplaceUpdated as ChromadinMarketplaceUpdatedEvent,
  ChromadinNFTUpdated as ChromadinNFTUpdatedEvent
} from "../generated/ChromadinEscrow/ChromadinEscrow"
import {
  AccessControlUpdated,
  ChromadinCollectionUpdated,
  ChromadinMarketplaceUpdated,
  ChromadinNFTUpdated
} from "../generated/schema"

export function handleAccessControlUpdated(
  event: AccessControlUpdatedEvent
): void {
  let entity = new AccessControlUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldAccessControl = event.params.oldAccessControl
  entity.newAccessControl = event.params.newAccessControl
  entity.updater = event.params.updater

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChromadinCollectionUpdated(
  event: ChromadinCollectionUpdatedEvent
): void {
  let entity = new ChromadinCollectionUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldChromadinCollection = event.params.oldChromadinCollection
  entity.newChromadinCollection = event.params.newChromadinCollection
  entity.updater = event.params.updater

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChromadinMarketplaceUpdated(
  event: ChromadinMarketplaceUpdatedEvent
): void {
  let entity = new ChromadinMarketplaceUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldChromadinMarketplace = event.params.oldChromadinMarketplace
  entity.newChromadinMarketplace = event.params.newChromadinMarketplace
  entity.updater = event.params.updater

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChromadinNFTUpdated(
  event: ChromadinNFTUpdatedEvent
): void {
  let entity = new ChromadinNFTUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldChromadinNFT = event.params.oldChromadinNFT
  entity.newChromadinNFT = event.params.newChromadinNFT
  entity.updater = event.params.updater

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
