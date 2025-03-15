import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

export function HousingAffordabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [downPayment, setDownPayment] = useState(500000);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(9.5);
  
  const [affordability, setAffordability] = useState({
    maxLoan: 0,
    monthlyPayment: 0,
    affordableHousePrice: 0,
    affordabilityRatio: 0,
  });

  useEffect(() => {
    // Calculate maximum loan based on 40% of monthly income going to mortgage
    const maxMonthlyPayment = monthlyIncome * 0.4;
    
    // Calculate loan amount based on monthly payment, interest rate, and term
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    
    // Present value of annuity formula
    const maxLoan = maxMonthlyPayment * ((1 - Math.pow(1 + monthlyInterestRate, -totalPayments)) / monthlyInterestRate);
    
    // Calculate affordable house price (loan + down payment)
    const affordableHousePrice = maxLoan + downPayment;
    
    // Calculate actual monthly payment for the max loan
    const monthlyPayment = (maxLoan * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / 
                          (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    
    // Calculate affordability ratio (monthly payment / monthly income)
    const affordabilityRatio = (monthlyPayment / monthlyIncome) * 100;
    
    setAffordability({
      maxLoan: Math.round(maxLoan),
      monthlyPayment: Math.round(monthlyPayment),
      affordableHousePrice: Math.round(affordableHousePrice),
      affordabilityRatio: Math.round(affordabilityRatio),
    });
  }, [monthlyIncome, downPayment, loanTerm, interestRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-4">Housing Affordability Calculator</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="monthlyIncome">Monthly Income</Label>
              <span className="text-sm font-medium">{formatCurrency(monthlyIncome)}</span>
            </div>
            <Slider
              id="monthlyIncome"
              min={10000}
              max={500000}
              step={5000}
              value={[monthlyIncome]}
              onValueChange={(value) => setMonthlyIncome(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>KES 10,000</span>
              <span>KES 500,000</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="downPayment">Down Payment</Label>
              <span className="text-sm font-medium">{formatCurrency(downPayment)}</span>
            </div>
            <Slider
              id="downPayment"
              min={100000}
              max={5000000}
              step={100000}
              value={[downPayment]}
              onValueChange={(value) => setDownPayment(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>KES 100,000</span>
              <span>KES 5,000,000</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="loanTerm">Loan Term (Years)</Label>
              <span className="text-sm font-medium">{loanTerm} years</span>
            </div>
            <Slider
              id="loanTerm"
              min={5}
              max={30}
              step={1}
              value={[loanTerm]}
              onValueChange={(value) => setLoanTerm(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 years</span>
              <span>30 years</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <span className="text-sm font-medium">{interestRate}%</span>
            </div>
            <Slider
              id="interestRate"
              min={7}
              max={18}
              step={0.1}
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>7%</span>
              <span>18%</span>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg space-y-4">
            <h4 className="font-medium text-center">Your Affordability Results</h4>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Affordable House Price:</span>
                <span className="font-bold">{formatCurrency(affordability.affordableHousePrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Maximum Loan Amount:</span>
                <span>{formatCurrency(affordability.maxLoan)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Monthly Mortgage Payment:</span>
                <span>{formatCurrency(affordability.monthlyPayment)}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Affordability Ratio:</span>
                <span className={affordability.affordabilityRatio <= 30 ? "text-green-500" : 
                                affordability.affordabilityRatio <= 40 ? "text-yellow-500" : "text-red-500"}>
                  {affordability.affordabilityRatio}%
                </span>
              </div>
              <Progress 
                value={affordability.affordabilityRatio} 
                max={50}
                className={affordability.affordabilityRatio <= 30 ? "text-green-500" : 
                          affordability.affordabilityRatio <= 40 ? "text-yellow-500" : "text-red-500"}
              />
              <div className="text-xs text-muted-foreground">
                {affordability.affordabilityRatio <= 30 
                  ? "Healthy (under 30% of income)" 
                  : affordability.affordabilityRatio <= 40 
                    ? "Manageable (30-40% of income)"
                    : "High risk (over 40% of income)"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
