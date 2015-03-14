open System

[<EntryPoint>]
let main argv = 
    let world = "World!"
    
    printfn "Hello %s" world

    Console.ReadLine() |> ignore

    0 // return an integer exit code