import Card from "./Card";

export default function CardsGrid({ cards, handleClick, flippedCards }) {
    return (
        <div className="cards-grid">
            {cards.map(card => (
                <Card
                    key={card.id}
                    card={card}
                    handleClick={handleClick}
                    flipped={flippedCards.includes(card) || card.matched}
                />
            ))}
        </div>
    );
}