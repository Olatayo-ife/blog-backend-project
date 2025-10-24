const { NewsletterSubscriber } = require('../models');
const { sendEmail } = require('../utils/emailService');

exports.subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });
    const [subscriber, created] = await NewsletterSubscriber.findOrCreate({
      where: { email }
    });
    if (!created) return res.json({ message: 'Already subscribed' });
    res.status(201).json({ message: 'Subscribed', email: subscriber.email });
  } catch (err) { next(err); }
};

exports.sendNewsletter = async (req, res, next) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message) return res.status(400).json({ message: 'subject and message required' });

    const subscribers = await NewsletterSubscriber.findAll({ attributes: ['email'] });
    const promises = subscribers.map(s => sendEmail(s.email, subject, `<div>${message}</div>`));
    await Promise.allSettled(promises); // continue even if some fail

    res.json({ message: `Newsletter sent to ${subscribers.length} subscribers` });
  } catch (err) { next(err); }
};
