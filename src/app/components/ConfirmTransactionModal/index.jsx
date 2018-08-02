import React from 'react'
import PropTypes from 'prop-types'
import { compose, setDisplayName, setPropTypes, defaultProps, withProps } from 'recompose'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

import {
  EthereumWalletLedger, EthereumWalletTrezor,
  BitcoinWalletLedger, BitcoinWalletTrezor,
} from 'Services/Wallet'

import LedgerEthInstructions from './LedgerEthInstructions'
import LedgerBtcInstructions from './LedgerBtcInstructions'

const supportedTypes = {
  [EthereumWalletLedger.type]: LedgerEthInstructions,
  [BitcoinWalletLedger.type]: LedgerBtcInstructions,
}

export default compose(
  setDisplayName('ConfirmTransactionModal'),
  setPropTypes({
    swap: PropTypes.object,
  }),
  defaultProps({
    swap: null,
  }),
  withProps(({ swap }) => {
    const InstructionComponent = swap && swap.tx && swap.tx.type && supportedTypes[swap.tx.type]
    return {
      InstructionComponent,
      isOpen: Boolean(swap && swap.txSigning && InstructionComponent),
    }
  })
)(({ swap, InstructionComponent, handleCancel, isOpen }) => (
  <Modal backdrop='static' isOpen={isOpen}>
    <ModalHeader className='text-primary'>
      Confirm Transaction
    </ModalHeader>
    <ModalBody>
      {InstructionComponent && (
        <InstructionComponent tx={swap.tx}/>
      )}
    </ModalBody>
    <ModalFooter className='justify-content-between'>
      <Button type='button' color='primary' outline onClick={handleCancel}>Cancel</Button>
    </ModalFooter>
  </Modal>
))