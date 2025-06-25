'use client'

import React, { useEffect, useState } from 'react'
import './HelpComponent.css'
import ViewLink from './ViewLink'

const FAQS = [
  {
    question: "What should I do if I forgot my password?",
    answer:
      'Go to the Login page and click on the "Forgot Password" text below the login button. You’ll be redirected to a recovery page where you need to enter your registered email. We will send a recovery code to your email — use that code to change your password.',
  },
  {
    question: "How do I earn points?",
    answer:
      'You can earn points by playing games available on the Home page and the Games page.',
  },
  {
    question: "How can I see my points?",
    answer:
      'First, log in to your account. Then, click on your profile avatar in the navigation bar. A screen will pop up showing your current points.',
  },
  {
    question: "How can I win a cash prize?",
    answer:
      'You can win a cash prize if you are among the top 3 players on the 1st day of every month.',
  },
  {
    question: "How can I see my balance?",
    answer:
      'First, log in to your account. Then, click on your profile avatar in the navigation bar. A screen will pop up — click on the "Balance" button. You’ll be redirected to the Balance page where you can view your current balance.',
  },
  {
    question: "How can I request a payout?",
    answer:
      'First, log in to your account. Then, click on your profile avatar in the navigation bar. A screen will pop up — click on the "Balance" button. You’ll be redirected to the Balance page where you\'ll see a withdrawal form. Enter your Bitcoin wallet address and the amount you want to withdraw, then click the "Withdraw" button.',
  },
  {
    question: "How can I withdraw my money?",
    answer:
      'You can withdraw your money in Bitcoin. Payouts are processed every upcoming Wednesday.',
  },
  {
    question: "When is the leaderboard updated?",
    answer: 'The leaderboard is updated in real-time after every game.',
  },
  {
    question: "How can I see the leaderboard?",
    answer:
      'You can see the leaderboard by going to the Leaderboard page from the navigation bar.',
  },
  {
    question: "Can I refer friends and earn more?",
    answer:
      'Yes! You earn 50% of the points your referred users earn.',
  },
  {
    question: "How can I refer my friends?",
    answer:
      'Go to the Affiliate page from the navigation bar. You’ll find your unique referral link there. Share that link with your friends — when they sign up using it, they’ll be linked to your account, and you’ll earn 50% of the points they earn.',
  },
  {
    question: "Is there a minimum withdrawal amount?",
    answer:
      'Yes! the minimum amount for withdrawal is $5 worth of Bitcoin.',
  },
];

export default function HelpComponent() {
  const [heights, setHeights] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const calcHeights = () => {
      const tempHeights = FAQS.map((_, index) => {
        const container = document.querySelectorAll('.Question-container')[index];
        const question = container.querySelector('.Question');
        const answer = container.querySelector('.Answer');

        question.classList.remove('hide-answer');
        container.style.height = 'auto';

        const fullHeight = container.getBoundingClientRect().height;
        const questionHeight = question.getBoundingClientRect().height + 20;

        question.classList.add('hide-answer');
        container.style.height = questionHeight + 'px';

        return { questionHeight, fullHeight };
      });
      setHeights(tempHeights);
    };

    setTimeout(calcHeights, 100);
    window.addEventListener('resize', calcHeights);
    return () => window.removeEventListener('resize', calcHeights);
  }, []);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="Help-container">
      <div className="Heading">Help</div>
      <div className="Questions">
        {FAQS.map((faq, index) => (
          <div
            className={`Question-container ${openIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => toggle(index)}
            style={{
              height: openIndex === index ? `${heights[index]?.fullHeight}px` : `${heights[index]?.questionHeight}px`,
              transition: 'height 0.5s ease'
            }}
          >
            <div className="QNA">
              <div className="Question">
                <b>{faq.question}</b>
              </div>
              <div className="Answer" style={{
                opacity: openIndex === index ? 1 : 0,
                top: openIndex === index ? `${heights[index]?.questionHeight}px` : '50%',
                transform: openIndex === index ? 'translateY(0%)' : 'translateY(-50%)',
                transition: 'all 0.5s ease'
              }}>
                {faq.answer}
              </div>
            </div>
            <div className="Arrow">
              <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
