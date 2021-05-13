import Stripe from "stripe"
import dotenv from "dotenv";
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const makeStripePayment = async (req, res) => {
    const total = req.query.total

    try {
        const intent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'ngn'
        })
        res.status(200).send({ client_secret: intent.client_secret })
    } catch (error) {
        res.status(402)
        throw new Error(error)
    }

}

export default makeStripePayment
