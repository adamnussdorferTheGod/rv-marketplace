import PriceDistributionChart from '@components/PriceDistributionChart'
import './App.css'

function App() {
  return (
    <div style={{ maxWidth: 640, margin: '40px auto', padding: '0 20px' }}>
      <PriceDistributionChart
        listPrice={18998}
        dealRating="fair"
        rangeMin={15297}
        rangeMax={17590}
        explanation="This vehicle is above the current average market range."
        priceHistory={[
          { date: '02/10/26', change: 'Listed', price: 18998 },
        ]}
      />
    </div>
  )
}

export default App
