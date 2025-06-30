import React from 'react'

export default function AboutUsComponent() {
    return (
        <div className='AboutUsContainer'>
            <div className="Content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 18 }}>
                <div className="Heading">
                    <h1>About Us</h1>
                </div>
                <p style={{ marginBottom: 10, maxWidth: 1000 }}>
                    Play2Win is a passion project created by a dedicated team of gaming enthusiasts who believe that skill and strategy should be rewarded. Our platform offers a fun and competitive environment where players can enjoy classic and modern skill-based games, compete against others, and earn points that translate into real rewards and monthly cash prizes.
                </p>
                <p style={{ marginBottom: 10, maxWidth: 1000 }}>
                    At Play2Win, we are committed to providing a fair and transparent gaming experience. We do not promote gambling or luck-based games. Instead, our focus is on games that require skill, strategy, and practice. Whether you are a casual gamer looking for fun or a serious competitor aiming for the top leaderboard spots, Play2Win welcomes you to join our growing community.
                </p>
                <p style={{ marginBottom: 10, maxWidth: 1000 }}>
                    We take your privacy and security seriously. Our platform complies with all relevant privacy laws, and we ensure that your personal information is protected. We encourage all players to review our Privacy Policy to understand how we collect, use, and safeguard your data.
                </p>
                <p style={{ marginBottom: 10, maxWidth: 1000 }}>
                    Our team continuously works to improve the platform by adding new games, features, and rewards based on community feedback. We believe in building a supportive and engaging environment where gamers of all skill levels can connect, compete, and grow.
                </p>
                <p style={{ marginBottom: 10, maxWidth: 1000 }}>
                    Play2Win also encourages responsible gaming and fair competition. We have strict rules and monitoring in place to prevent cheating and ensure that all players have a level playing field. Our commitment to fairness helps maintain a trustworthy platform for everyone.
                </p>
                <p style={{ maxWidth: 1000 }}>
                    Thank you for choosing Play2Win. We invite you to explore our games, compete for prizes, and be part of a vibrant community where every move counts!
                </p>
            </div>
        </div>
    )
}
