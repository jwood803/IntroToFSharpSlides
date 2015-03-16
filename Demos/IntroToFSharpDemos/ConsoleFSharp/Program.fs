open System

[<EntryPoint>]
let main argv = 
    let world = "World!"
    
    printfn "Hello %s" world

    let input = Console.ReadLine()

    0 // return an integer exit code