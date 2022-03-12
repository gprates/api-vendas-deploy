import { Request, Response } from 'express';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { password, token } = request.body;

        const resetPasswordEmail = new ResetPasswordService();

        await resetPasswordEmail.execute({
            password,
            token,
        });

        return response.status(204).json();
    }
}