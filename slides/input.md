- title : F#
- description : Introduction to F#
- author : Jonathan Wood
- theme : night
- transition : default

***

### What is F#?

Functional first .NET language.


***

### Why F#?

- Type providers
- Option Type
- Rapid prototyping with the F# Interactive
- Fewer bugs
  - Immutable
  - Units of Measure
- Interoperability
  - Other languages than just .NET languages
  
***

### Type Providers
There are already a **ton** of readily available type providers to access anything that you may need.

| SQL  |  Entity Framework| Freebase   | Worldbank   |
|--------------------------|------------------|------|
| CSV  | Excel | XAML | Hive |
| JSON | R | Python? | XML |

***

### Option Type

> Insert the null exception tweet here.

---

  type PhoneNumber = { Home: string option
                       Cell: string option
                       Work: string option
                     }

  let myPhone = { Home = None
                  Cell = Some "555-555-5555"
                  Work = Some "555-555-5551"
                }

  let getHomePhone phoneNumber =
      match phoneNumber.Home with
      | Some number -> printfn "Number is %s" number
      | None -> printfn "No number provided"