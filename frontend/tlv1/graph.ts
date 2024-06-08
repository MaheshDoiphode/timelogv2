// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Chart, ChartConfiguration, registerables, Point } from 'chart.js';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { forkJoin } from 'rxjs';

// interface Transaction {
//   transactionID: string;
//   userID: string;
//   paymentType: string;
//   accountNumber: string;
//   amount: number;
//   status: string;
//   errorDescription: string;
//   timestamp: string;
//   remainingBalance: number;
// }

// @Component({
//   selector: 'app-graphs',
//   templateUrl: './graphs.component.html',
//   styleUrls: ['./graphs.component.css'],
// })
// export class GraphsComponent implements OnInit, OnDestroy {
//   private userID = 'Mahesh91.09683588623945'; // Replace with the actual user ID

//   private transactionFrequencyChart: Chart<
//     'line',
//     (number | Point | null)[],
//     unknown
//   > | null = null;
//   private debitCreditAmountsChart: Chart<
//     'bar',
//     (number | [number, number] | null)[],
//     unknown
//   > | null = null;
//   private paymentTypeChart: Chart<'pie', number[], unknown> | null = null;

//   constructor(private http: HttpClient) {}

//   ngOnDestroy() {
//     this.destroyCharts();
//   }

//   private destroyCharts() {
//     if (this.transactionFrequencyChart) {
//       this.transactionFrequencyChart.destroy();
//       console.log('Destroyed transactionFrequencyChart');
//     }
//     if (this.debitCreditAmountsChart) {
//       this.debitCreditAmountsChart.destroy();
//       console.log('Destroyed debitCreditAmountsChart');
//     }
//     if (this.paymentTypeChart) {
//       this.paymentTypeChart.destroy();
//       console.log('Destroyed paymentTypeChart');
//     }
//   }

//   ngOnInit() {
//     Chart.register(...registerables);

//     if (
//       !this.transactionFrequencyChart &&
//       !this.debitCreditAmountsChart &&
//       !this.paymentTypeChart
//     ) {
//       this.fetchData().subscribe(
//         ([
//           transactionFrequencyData,
//           debitCreditAmountsData,
//           paymentTypesData,
//         ]) => {
//           this.destroyCharts();
//           // Create new charts
//           if (transactionFrequencyData) {
//             const transactionFrequencyChartConfig: ChartConfiguration<'line'> =
//               {
//                 type: 'line',
//                 data: {
//                   labels: Object.keys(transactionFrequencyData),
//                   datasets: [
//                     {
//                       label: 'Number of Transactions',
//                       data: Object.values(transactionFrequencyData).map(Number),
//                       fill: false,
//                       borderColor: 'rgb(75, 192, 192)',
//                       tension: 0.1,
//                     },
//                   ],
//                 },
//               };
//             this.transactionFrequencyChart = new Chart(
//               'transactionFrequencyChart',
//               transactionFrequencyChartConfig
//             );
//             console.log(
//               'Created transactionFrequencyChart',
//               this.transactionFrequencyChart
//             );
//           }

//           if (debitCreditAmountsData) {
//             const debitCreditAmountsChartConfig: ChartConfiguration<'bar'> = {
//               type: 'bar',
//               data: {
//                 labels: ['Debit', 'Credit'],
//                 datasets: [
//                   {
//                     label: 'Amount',
//                     data: debitCreditAmountsData.map(Number),
//                     backgroundColor: [
//                       'rgba(255, 99, 132, 0.2)',
//                       'rgba(75, 192, 192, 0.2)',
//                     ],
//                     borderColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)'],
//                     borderWidth: 1,
//                   },
//                 ],
//               },
//               options: {
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                   },
//                 },
//               },
//             };
//             this.debitCreditAmountsChart = new Chart(
//               'debitCreditAmountsChart',
//               debitCreditAmountsChartConfig
//             );
//             console.log(
//               'Created debitCreditAmountsChart',
//               this.debitCreditAmountsChart
//             );
//           }
//           if (paymentTypesData) {
//             const paymentTypeChartConfig: ChartConfiguration<'pie'> = {
//               type: 'pie',
//               data: {
//                 labels: Object.keys(paymentTypesData),
//                 datasets: [
//                   {
//                     label: 'Number of Transactions',
//                     data: Object.values(paymentTypesData).map(Number),
//                     backgroundColor: [
//                       'rgba(255, 99, 132, 0.2)',
//                       'rgba(75, 192, 192, 0.2)',
//                       'rgba(255, 205, 86, 0.2)',
//                       'rgba(201, 203, 207, 0.2)',
//                     ],
//                     borderColor: [
//                       'rgb(255, 99, 132)',
//                       'rgb(75, 192, 192)',
//                       'rgb(255, 205, 86)',
//                       'rgb(201, 203, 207)',
//                     ],
//                     borderWidth: 1,
//                   },
//                 ],
//               },
//             };
//             this.paymentTypeChart = new Chart(
//               'paymentTypeChart',
//               paymentTypeChartConfig
//             );
//           }
//         }
//       );
//     }
//   }

//   private fetchData() {
//     const transactionsByDay$ = this.http
//       .get<Transaction[]>(
//         `https://localhost:7211/api/transaction/all/${this.userID}`
//       )
//       .pipe(
//         map((transactions) => {
//           const transactionsByDay: { [key: string]: number } = {};
//           transactions.forEach((transaction) => {
//             const date = new Date(transaction.timestamp).toLocaleDateString();
//             if (!transactionsByDay[date]) {
//               transactionsByDay[date] = 0;
//             }
//             transactionsByDay[date]++;
//           });
//           return transactionsByDay;
//         })
//       );

//     const positiveNegativeAmounts$ = this.http
//       .get<Transaction[]>(
//         `https://localhost:7211/api/transaction/all/${this.userID}`
//       )
//       .pipe(
//         map((transactions) => {
//           const positiveNegativeAmounts = [0, 0]; // [debit, credit]
//           transactions.forEach((transaction) => {
//             if (transaction.amount < 0) {
//               positiveNegativeAmounts[0] += transaction.amount;
//             } else {
//               positiveNegativeAmounts[1] += transaction.amount;
//             }
//           });
//           return positiveNegativeAmounts;
//         })
//       );

//     const paymentTypes$ = this.http
//       .get<Transaction[]>(
//         `https://localhost:7211/api/transaction/all/${this.userID}`
//       )
//       .pipe(
//         map((transactions) => {
//           const paymentTypes: { [key: string]: number } = {};
//           transactions.forEach((transaction) => {
//             if (!paymentTypes[transaction.paymentType]) {
//               paymentTypes[transaction.paymentType] = 0;
//             }
//             paymentTypes[transaction.paymentType]++;
//           });
//           return paymentTypes;
//         })
//       );

//     return forkJoin([
//       transactionsByDay$,
//       positiveNegativeAmounts$,
//       paymentTypes$,
//     ]);
//   }
// }


// // /////HTML

// <div class="container">
//   <div class="row">
//     <div class="col-12">
//       <mat-card>
//         <mat-card-header>
//           <mat-card-title>Transaction Frequency by Day</mat-card-title>
//         </mat-card-header>
//         <mat-card-content>
//           <canvas id="transactionFrequencyChart"></canvas>
//         </mat-card-content>
//       </mat-card>
//     </div>
//     <div class="col-12">
//       <mat-card>
//         <mat-card-header>
//           <mat-card-title>Debit and Credit Amounts</mat-card-title>
//         </mat-card-header>
//         <mat-card-content>
//           <canvas id="debitCreditAmountsChart"></canvas>
//         </mat-card-content>
//       </mat-card>
//     </div>
//     <div class="col-12">
//       <mat-card>
//         <mat-card-header>
//           <mat-card-title>Usage of Payment Types</mat-card-title>
//         </mat-card-header>
//         <mat-card-content>
//           <canvas id="paymentTypeChart"></canvas>
//         </mat-card-content>
//       </mat-card>
//     </div>
//   </div>
// </div>