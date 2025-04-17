export default function Card({ card, handleClick, flipped }) {
    return (
        <div className="card" onClick={() => handleClick(card)}>
            <div className={`card-inner ${flipped ? "flipped" : ""}`}>
                <p className="front">{card.symbol}</p>
                <div className="back" />
            </div>
        </div>
    );
}