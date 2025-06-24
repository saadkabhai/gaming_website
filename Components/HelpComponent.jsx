'use client'
import React, { useEffect, useMemo, useState } from 'react'
import './HelpComponent.css'
import ViewLink from './ViewLink'
export default function HelpComponent() {
    const [QuestionContainerOpenHeight, setQuestionContainerOpenHeight] = useState(),
        [QuestionContainerCloseHeight, setQuestionContainerCloseHeight] = useState(),
        [ShouldOpenClose, setShouldOpenClose] = useState(true)
    const GetHeightAndWidth = () => {
        const Questions = document.querySelectorAll('.Question-container'),
            Questions_container = document.querySelector('.Questions'),
            Opendimensions = [],
            Closedimensions = []
        Questions.forEach((Question) => {
            Question.classList.remove('hide-answer')
            Question.style.height = 'auto'
            const Question_rect = Question.getBoundingClientRect(),
                Question_text = Question.querySelector('.Question'),
                Question_text_rect = Question_text.getBoundingClientRect()
            Closedimensions.push({
                height: Question_text_rect.height + 20
            })

            Opendimensions.push({
                height: Question_rect.height
            });
            Question.style.height = Question_text_rect.height + 20 + 'px'
            Question.classList.add('hide-answer')
        })
        setQuestionContainerOpenHeight(Opendimensions);
        setQuestionContainerCloseHeight(Closedimensions)
        Questions_container.classList.add('show')
    }
    const ShowAndCloseAnswer = (e, index) => {
        if (!ShouldOpenClose) return
        setShouldOpenClose(false)
        const Question_text = e.target.querySelector('.Question'),
            Answer_text = e.target.querySelector('.Answer'),
            Questions = document.querySelectorAll('.Question-container')
        if (e.target.classList.contains('active')) {
            e.target.classList.remove('active')
            e.target.style.height = QuestionContainerCloseHeight[index].height + 'px'
            Question_text.style.top = '50%'
            Question_text.style.transform = 'translateY(-50%)';
            Answer_text.style.opacity = 0
            Answer_text.style.top = `50%`
            Answer_text.style.transform = 'translateY(-50%)';
        } else {
            Questions.forEach((Question, all_question_index) => {
                const all_Question_text = Question.querySelector('.Question'),
                    all_Answer_text = e.target.querySelector('.Answer')
                Question.classList.remove('active')
                Question.style.height = QuestionContainerCloseHeight[all_question_index].height + 'px'
                all_Question_text.style.top = '50%'
                all_Question_text.style.transform = 'translateY(-50%)';
                all_Answer_text.style.opacity = 0
                all_Answer_text.style.top = `50%`
                all_Answer_text.style.transform = 'translateY(-50%)';
            })
            e.target.classList.add('active')
            Question_text.style.top = '10px'
            Question_text.style.transform = 'translateY(0%)';
            Answer_text.style.opacity = 1
            Answer_text.style.top = `${QuestionContainerCloseHeight[index].height + 0}px`
            Answer_text.style.transform = 'translateY(0%)';
            e.target.style.height = QuestionContainerOpenHeight[index].height - 10 + 'px'
            setTimeout(() => {
                const distanceFromTop = e.target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: distanceFromTop,
                    behavior: 'smooth'
                });
            }, 600);
        }
        setTimeout(() => {
            setShouldOpenClose(true)
        }, 500);
    }
    useEffect(() => {
        GetHeightAndWidth()
    }, [])
    return (
        <div className='Help-container'>
            <div className="Heading">Help</div>
            <div className="Questions">
                <div className="Question-container" onClick={(e) => ShowAndCloseAnswer(e, 0)}>
                    <div className="QNA">
                        <div className="Question"><b>What should I do if I forgot my password?</b></div>
                        <div className="Answer">Go to the Login page and click on the <b>"Forgot Password"</b> text below the login button. You’ll be redirected to a recovery page where you need to enter your <b>registered email.</b> We will send a recovery code to your email — use that code to change your password.</div>
                    </div>
                    <div className="Arrow">
                        <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
                    </div>
                </div>
                <div className="Question-container" onClick={(e) => ShowAndCloseAnswer(e, 1)}>
                    <div className="QNA">
                        <div className="Question"><b>How do I earn points?</b></div>
                        <div className="Answer">You can earn points by playing games available on the Home page and the Games page.</div>
                    </div>
                    <div className="Arrow">
                        <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
                    </div>
                </div>
                <div className="Question-container" onClick={(e) => ShowAndCloseAnswer(e, 2)}>
                    <div className="QNA">
                        <div className="Question"><b>How can I see my points?</b></div>
                        <div className="Answer">First, <b>log in</b> to your account. Then, click on your <b>profile avatar</b> in the navigation bar. A screen will pop up showing your <b>current points.</b></div>
                    </div>
                    <div className="Arrow">
                        <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
                    </div>
                </div>
                <div className="Question-container" onClick={(e) => ShowAndCloseAnswer(e, 3)}>
                    <div className="QNA">
                        <div className="Question"><b>How can I win a cash prize?</b></div>
                        <div className="Answer">You can win a cash prize if you are among the top 3 players on the 1st day of every month.</div>
                    </div>
                    <div className="Arrow">
                        <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
                    </div>
                </div>
                <div className="Question-container" onClick={(e) => ShowAndCloseAnswer(e, 4)}>
                    <div className="QNA">
                        <div className="Question"><b>How can I see my balance?</b></div>
                        <div className="Answer">First, <b>log in</b> to your account. Then, click on your <b>profile avatar</b> in the navigation bar. A screen will pop up — click on the <b>"Balance"</b> button. You’ll be redirected to the <b>Balance page</b> where you can view your current balance.</div>
                    </div>
                    <div className="Arrow">
                        <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
                    </div>
                </div>
                <div className="Question-container" onClick={(e) => ShowAndCloseAnswer(e, 5)}>
                    <div className="QNA">
                        <div className="Question"><b>How can I request a payout?</b></div>
                        <div className="Answer">First, <b>log in</b> to your account. Then, click on your <b>profile avatar</b> in the navigation bar. A screen will pop up — click on the <b>"Balance"</b> button. You’ll be redirected to the <b>Balance page</b> where you'll see a <b>withdrawal form.</b> Enter your <b>Bitcoin wallet address</b> and the <b>amount</b> you want to withdraw, then click the <b>"Withdraw"</b> button.</div>
                    </div>
                    <div className="Arrow">
                        <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
                    </div>
                </div>
                <div className="Question-container" onClick={(e) => ShowAndCloseAnswer(e, 6)}>
                    <div className="QNA">
                        <div className="Question"><b>How can I withdraw my money?</b></div>
                        <div className="Answer">You can withdraw your money in Bitcoin. Payouts are processed every upcoming Wednesday.</div>
                    </div>
                    <div className="Arrow">
                        <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
                    </div>
                </div>
                <div className="Question-container" onClick={(e) => ShowAndCloseAnswer(e, 7)}>
                    <div className="QNA">
                        <div className="Question"><b>When is the leaderboard updated?</b></div>
                        <div className="Answer">The leaderboard is updated in real-time after every game.</div>
                    </div>
                    <div className="Arrow">
                        <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
                    </div>
                </div>
                <div className="Question-container" onClick={(e) => ShowAndCloseAnswer(e, 8)}>
                    <div className="QNA">
                        <div className="Question"><b>How can I see the leaderboard?</b></div>
                        <div className="Answer">You can see the leaderboard by going to the <b>Leaderboard page</b> from the <b>navigation bar.</b></div>
                    </div>
                    <div className="Arrow">
                        <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
                    </div>
                </div>
                <div className="Question-container" onClick={(e) => ShowAndCloseAnswer(e, 9)}>
                    <div className="QNA">
                        <div className="Question"><b>Can I refer friends and earn more?</b></div>
                        <div className="Answer"><b>Yes!</b> You earn 50% of the points your referred users earn.</div>
                    </div>
                    <div className="Arrow">
                        <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
                    </div>
                </div>
                <div className="Question-container" onClick={(e) => ShowAndCloseAnswer(e, 10)}>
                    <div className="QNA">
                        <div className="Question"><b>How can I refer my friends?</b></div>
                        <div className="Answer">Go to the <b>Affiliate page</b> from the navigation bar. You’ll find your <b>unique referral link</b> there. Share that link with your friends — when they sign up using it, they’ll be linked to your account, and you’ll earn 50% of the points they earn.</div>
                    </div>
                    <div className="Arrow">
                        <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
                    </div>
                </div>
                <div className="Question-container" onClick={(e) => ShowAndCloseAnswer(e, 11)}>
                    <div className="QNA">
                        <div className="Question"><b>Is there a minimum withdrawal amount?</b></div>
                        <div className="Answer"><b>Yes!</b> the minimum amount for withdrawal is <b>$5</b> worth of Bitcoin.</div>
                    </div>
                    <div className="Arrow">
                        <i style={{ fontSize: 20 }} className="fa-regular fa-chevron-down"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
