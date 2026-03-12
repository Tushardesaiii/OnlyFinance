import { Router, type Request, type Response } from 'express';

export const router = Router();

// Mock Data for now, to be replaced by Database in Phase 7
const mockWealthSummary = {
    netWorth: 21408340.50,
    trend: 4.2,
    assets: {
        equity: 14250000,
        fixedDeposits: 5000000,
        activeDebt: 2158340
    }
};

const mockLiabilities = [
    {
        id: 'L-1',
        type: 'Home Loan',
        principal: 2158340,
        annualRate: 10.5,
        remainingMonths: 120,
    }
];

router.get('/wealth/summary', (req: Request, res: Response) => {
    res.json(mockWealthSummary);
});

router.get('/liabilities/active', (req: Request, res: Response) => {
    res.json(mockLiabilities);
});

// Mock LLM Orchestration
router.post('/copilot/chat', async (req: Request, res: Response) => {
    const { message } = req.body;
    
    // In a real app we would:
    // 1. Fetch `mockWealthSummary`
    // 2. Inject it as a system prompt to Gemini
    // 3. Send back the real generated response
    
    // For MVP demonstration, simulate an intelligent context-aware response
    let reply = "Hello! I am your financial Co-Pilot.";
    if (message.toLowerCase().includes('plan') || message.toLowerCase().includes('strategy')) {
         reply = `Based on your net worth of ₹${(mockWealthSummary.netWorth / 100000).toFixed(2)}L and an active liability, I'd suggest looking at your Debt Snowball plan first.`;
    } else if (message.toLowerCase().includes('sip') || message.toLowerCase().includes('invest')) {
         reply = `With ₹${(mockWealthSummary.assets.fixedDeposits / 100000).toFixed(2)}L in FDs, consider shifting some emergency corpus into aggressive Equity if your risk appetite allows it.`;
    } else {
         reply = `I see you asking about "${message}". As your Zenith Co-Pilot, I can analyze your ₹${(mockWealthSummary.netWorth / 100000).toFixed(2)}L portfolio. What specific advice do you need?`;
    }

    // Simulate network delay
    setTimeout(() => {
        res.json({ reply });
    }, 1000);
});
