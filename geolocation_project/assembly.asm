
; Sample Assembly for reading GPS data (pseudo-assembly, replace with specific device syntax)

START:
    MOV R0, #0x4000   ; Load address for GPS register
    LDR R1, [R0]      ; Load data from GPS register to R1
    CMP R1, #0        ; Check if data is ready
    BEQ START         ; Loop until data is available

READ_LAT:
    MOV R0, #LATITUDE_REG ; Load latitude register address
    LDR R2, [R0]          ; Read latitude value to R2

READ_LON:
    MOV R0, #LONGITUDE_REG ; Load longitude register address
    LDR R3, [R0]           ; Read longitude value to R3

; Output latitude and longitude values
OUTPUT:
    STR R2, LAT_OUTPUT_ADDR ; Store latitude to output
    STR R3, LON_OUTPUT_ADDR ; Store longitude to output
    B START                ; Repeat for continuous reading
