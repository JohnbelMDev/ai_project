(module
    (func $calculate_force (param $mass f64) (param $acceleration f64) (result f64)
        get_local $mass
        get_local $acceleration
        f64.mul
    )
    (export "calculate_force" (func $calculate_force))
)
