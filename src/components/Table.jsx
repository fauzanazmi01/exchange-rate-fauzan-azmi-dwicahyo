import { useEffect, useState } from 'react'

export default function Table() {
    const [rates, setRates] = useState(null);
    const [apiKey] = useState(process.env.REACT_APP_CURRENCY_FREAKS_API_KEY)

    useEffect(() => {
        const fetchRates = async (apiKey) => {
            let data = null
            if (apiKey) {
                const response = await fetch("https://api.currencyfreaks.com/v2.0/rates/latest?symbols=CAD,IDR,JPY,CHF,EUR,GBP&apikey=" + apiKey)
                data = (await response.json()).rates
            }
            else {
                data = {
                    "AGLD": "2.3263929277654998",
                    "FJD": "2.21592",
                    "MXN": "18.670707655673546",
                    "LVL": "0.651918",
                    "SCR": "13.21713243157135",
                    "CDF": "2068.490771",
                    "BBD": "2.0",
                    "HNL": "24.57644632001569"
                }
            }

            const newdata = Object.entries(data).map(([key, value]) => {
                const val = parseFloat(value);
                return {curr: key, rate: val, weBuy: val * 0.95, weSell: val * 1.05}
            });
            setRates(newdata)
        }

        fetchRates(apiKey)
    }, [])

    return <div>
    {
        rates ? (
            <div>
                <h1>Exchange Rates</h1>
                { !apiKey && (<subtitle>Note: Running without API key REACT_APP_CURRENCY_FREAKS_API_KEY</subtitle>) }
                <table className='bg-transparent'>
                    <thead>
                        <tr>
                            <th scope="col">Currency</th>
                            <th scope="col">We Sell</th>
                            <th scope="col">Rate</th>
                            <th scope="col">We Buy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.map((rate, index) => (
                            <tr key={index}>
                                <th scope="row">{rate.curr}</th>
                                <td>{Number(rate.weSell).toFixed(3)}</td>
                                <td>{Number(rate.rate).toFixed(3)}</td>
                                <td>{Number(rate.weBuy).toFixed(3)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
        :
        <span className="loader"></span>
    }
    </div>
}