export enum ErrorMessage {
    DEPARTMENT = 'Du behöver väja en avdelning',
    GOALTYPE = 'Du behöver väja ett mål',
    SHORT = 'Innehållet är för kort. Använd minst $constraint1 tecken',
    ALPHA = 'Innehållet kan endast innehålla bokstäver',
    ALPHANUMERIC = 'Innehållet kan endast innehålla bokstäver och siffror',
    EMPTY = 'Det kan inte vara ett tomt värde',
    DATE = 'Datumet måste ha rätt format',
    URL = 'Länken måste ha rätt format'
    
}

export interface DashboardObject {
    type: string
    data: string | string[] | number | number[]
}