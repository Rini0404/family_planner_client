export enum SelectedMember {
    ME = 'Me',
    EVERYONE = 'Everyone'
}

export enum DateChosen {
    TODAY = 'Today',
    CUSTOM = 'Custom'
}

export type FilterOptions = {
    member: SelectedMember
    date: Date | null
    status: string
}
