import Papa from 'papaparse';

const SPREADSHEET_ID = '1KlsdgFq6XaGVJuXnMhWwqG_fFtsUFTX--5oWxMYgCJ4';
const GIDS = {
    series_master: '0',
    tournament_details: '391906141',
    rates: '364464980',
};

export type Series = {
    series_id: string;
    brand_name: string;
    logo_url: string;
    total_prize_jpy: number;
    country: string;
    city: string;
    start_date: string;
    end_date: string;
};

export type Tournament = {
    event_id: string;
    series_id: string;
    event_name: string;
    buyin_local: number;
    currency: string;
    deepness_score: number;
    rake_percent: string;
    tax_info: string;
    start_time: string;
};

export type ExchangeRate = {
    currency_code: string;
    rate_to_jpy: number;
};

export async function fetchCSV<T>(gid: string): Promise<T[]> {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${gid}`;
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    const text = await response.text();

    return new Promise((resolve, reject) => {
        Papa.parse(text, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data as T[]),
            error: (error: Error) => reject(error),
        });
    });
}

export async function getSeriesMaster() {
    return fetchCSV<Series>(GIDS.series_master);
}

export async function getTournamentDetails() {
    return fetchCSV<Tournament>(GIDS.tournament_details);
}

export async function getExchangeRates() {
    return fetchCSV<ExchangeRate>(GIDS.rates);
}
