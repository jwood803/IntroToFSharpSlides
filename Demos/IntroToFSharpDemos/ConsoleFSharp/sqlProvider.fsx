open System
open System.Data
open System.Data.Linq
open Microsoft.FSharp.Data.TypeProviders

#r "System.Data.dll"
#r "FSharp.Data.TypeProviders.dll"

type dbSchema = SqlDataConnection<"Data Source=localhost\SQLEXPRESS;Initial Catalog=northwind;Integrated Security=SSPI;">

let db = dbSchema.GetDataContext()