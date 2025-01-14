import express from 'express';
import {
  createProposalHandler,
  deleteProposalByIdHandler,
  getAllMineProposalsHandler,
  getAllRecivedProposalsHandler,
  getProposalByIdHandler,
  updateProposalByIdHandler,
} from '../controllers/proposals.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/proposal', authenticate, createProposalHandler);

router.get('/sent', authenticate, getAllMineProposalsHandler);

router.get('/recieved', authenticate, getAllRecivedProposalsHandler);

router.get('/:id', authenticate, getProposalByIdHandler);

router.patch('/:id', authenticate, updateProposalByIdHandler);

router.delete('/:id', authenticate, deleteProposalByIdHandler);

export default router;
