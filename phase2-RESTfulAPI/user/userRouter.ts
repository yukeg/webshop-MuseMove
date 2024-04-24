import express from 'express';
import { Request, Response } from 'express';
import { UserService } from './model-manager';

const router = express.Router();

router.post('/users', (req: Request, res: Response) => {
    const result = UserService.createUser(req.body);
    if ('error' in result) {
        res.status(400).send(result.error);
    } else {
        res.status(201).send(result);
    }
});

export default router;

